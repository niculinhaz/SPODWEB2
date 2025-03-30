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
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = "<p>Não há nenhuma tarefa.</p>";
    }

    let count = 1;

    for (const todo of todos) {
        const todoItem = document.createElement("li");
        todoItem.classList = ["todo"];
        todoItem.id = todo.id;

        const todoItemText = document.createElement("p");
        todoItemText.textContent = todo.text;
        todoItem.appendChild(todoItemText);

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
    todoList.innerHTML = "";
    
    if (todos.length === 0) {
        todoList.innerHTML = "<p>Não há nenhuma tarefa pendente.</p>";
    }
    
    let count = 1;
    for (const todo of todos) {
        if (!todo.completed) {
            const todoItem = document.createElement("li");
            todoItem.classList = ["todo"];
            todoItem.id = todo.id;

            const todoItemText = document.createElement("p");
            todoItemText.textContent = todo.text;
            todoItem.appendChild(todoItemText);

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
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = "<p>Não há nenhuma tarefa concluída.</p>";
    }

    let count = 1;

    for (const todo of todos) {
        if (todo.completed) {
            const todoItem = document.createElement("li");
            todoItem.classList = ["todo"];
            todoItem.id = todo.id;

            const todoItemText = document.createElement("p");
            todoItemText.textContent = todo.text;
            todoItem.appendChild(todoItemText);

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