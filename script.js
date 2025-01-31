const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");


function showAvailableTodos() {
  let arr = JSON.parse(localStorage.getItem("todo"));
  if (arr.length < 0) return;
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `
                <span>${arr[i]}</span>
                <button class="delete-btn">Delete</button>
            `;
    li.addEventListener("click", toggleComplete);
    li.querySelector(".delete-btn").addEventListener("click", deleteTodo);
    todoList.appendChild(li);
    todoInput.value = "";
  }
}
showAvailableTodos();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `
                <span>${todoText}</span>
                <button class="delete-btn">Delete</button>
            `;
    li.addEventListener("click", toggleComplete);
    li.querySelector(".delete-btn").addEventListener("click", deleteTodo);
    todoList.appendChild(li);
    todoInput.value = "";
    ////Save to local storage
    let arr = JSON.parse(localStorage.getItem("todo")) || [];
    arr.push(todoText);
    let string = JSON.stringify(arr);
    localStorage.setItem("todo", string);
  }
}

function toggleComplete(e) {
  e.target.classList.add("completed");
}

function deleteTodo(e) {
  e.stopPropagation();
  const li = e.target.closest("li");
  const todoText = li.querySelector("span").textContent;
  li.remove();
  let arr = JSON.parse(localStorage.getItem("todo")) || [];
  arr = arr.filter((item) => item !== todoText);
  localStorage.setItem("todo", JSON.stringify(arr));
}
