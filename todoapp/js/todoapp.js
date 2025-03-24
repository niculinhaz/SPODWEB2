const todos = [];

document.getElementById("new-todo").addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTodo();
});

document.getElementById("all").addEventListener("click", function (e) {
    renderTodos();
});

document.getElementById("pending").addEventListener("click", function (e) {
    renderPendingTodos();
});

document.getElementById("finished").addEventListener("click", function (e) {
    renderCompletedTodos();
});

document.getElementById("btn").addEventListener("click", function (e) {
    addTodo();
});

function addTodo() {
    let todoInput = document.getElementById("new-todo");
    if (todoInput.value === "") return;

    let newTodo = { id: (todos.length + 1), text: (todoInput.value), completed: (false) };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "Tarefas";
    let count = 1;

    for (const todo of todos) {
        const todoItem = document.createElement("li");
        todoItem.id = todo.id;
        todoItem.textContent = todo.text;

        if (!todo.completed) {
            const completeTodo = document.createElement("button");
            completeTodo.id = "complete-button";
            completeTodo.textContent = "Concluir Tarefa";

            completeTodo.onclick = function (e) {
                updateTodo(todoItem.id);
            }

            todoItem.appendChild(completeTodo);
        }


        todoList.appendChild(todoItem);
        count++;
    }
}

function renderPendingTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "Tarefas Pendentes";
    let count = 1;

    for (const todo of todos) {
        if (!todo.completed) {
            const todoItem = document.createElement("li");
            todoItem.id = todo.id;
            todoItem.textContent = todo.text;

            const completeTodo = document.createElement("button");
            completeTodo.id = "complete-button";
            completeTodo.textContent = "Concluir Tarefa";

            completeTodo.onclick = function (e) {
                updateTodo(todoItem.id);
            }

            todoItem.appendChild(completeTodo);

            todoList.appendChild(todoItem);
        }
    }
}

function renderCompletedTodos() {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = "Tarefas Concluídas";
    let count = 1;

    for (const todo of todos) {
        if (todo.completed) {
            const todoItem = document.createElement("li");
            todoItem.id = todo.id;
            todoItem.textContent = todo.text;

            todoList.appendChild(todoItem);
        }
    }
}

function updateTodo(todoId) {
    let index = todos.findIndex((todo) => {
        return todo.id == todoId;
    })
    let completeButton = document.getElementById(todoId).lastChild;
    completeButton.remove();
    todos[index].completed = !todos[index].completed;
}

// function deleteTodo(todoId) {
//     let index = todos.findIndex((todo) => {
//         return todo.id == todoId;
//     })
//     todos.splice(index, 1);
//     renderTodos();
// }


// document.getElementById("new-todo").addEventListener("keypress", function(e) {
// if (e.key === "Enter") {
//     let todoInput = document.getElementById("new-todo");

//     if (todoInput.value === "") return;

//     const todoList = document.getElementById("todo-list");

//     const todoItem = document.createElement("li");
//     todoItem.textContent = todoInput.value;

//     const removeTodo = document.createElement("button");
//     removeTodo.textContent = "Remover Tarefa";

//     removeTodo.onclick = function(e) {
//         todoList.removeChild(todoItem);
//     }

//     todoItem.appendChild(removeTodo);
//     todoList.appendChild(todoItem);

//     todoInput.value = "";
// }
// });

