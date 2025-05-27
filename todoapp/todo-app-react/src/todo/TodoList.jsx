import { useState } from 'react';
import { useEffect } from 'react';

const AddTodo = ({ onAddTodo }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddTodo = () => {
        if (inputValue.trim() === '') return;
        onAddTodo(inputValue);
        setInputValue('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <>
            <input 
                id="new-todo" 
                type="text" 
                placeholder="Adicione sua tarefa.."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            <button id="btn" onClick={handleAddTodo}>Adicionar Tarefa</button>
        </>
    );
}

const TodoFilter = ({ onFilterChange }) => {
    return (
        <section className="second-row">
            <a id="all" className="first-tab tab" onClick={() => onFilterChange('all')}>Ver todas</a>
            <a id="pending" className="middle-tab tab" onClick={() => onFilterChange('pending')}>Tarefas pendentes</a>
            <a id="finished" className="end-tab tab" onClick={() => onFilterChange('completed')}>Tarefas concluídas</a>
        </section>
    )
}

const TodoItem = ({ todo, onToggleComplete }) => {
    return (
        <li className="todo" id={todo.id}>
            <p>{todo.text}</p>
            {!todo.done && (
                <button 
                    id="complete-button" 
                    onClick={() => onToggleComplete(todo.id)}
                >
                    Concluir tarefa
                </button>
            )}
        </li>
    )
}

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    const addTodo = (text) => {
        const newTodo = { id: crypto.randomUUID(), text, done: false };
        fetch("http://localhost:3000/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(newTodo),
            })
            .then((response) => {
                if (!response.ok) {
                throw new Error("Erro ao realizar o Post");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Post bem-sucedido");
                setTodos((prevTodos) => [...prevTodos, newTodo]);
            })
            .catch((error) => {
                throw new Error("Erro ao inserir nova task");
            });
        };

    const markTodoAsDone = (id) => {
        const URL_PUT = `http://localhost:3000/todos/${id}`;
        const task = todos.find((todo) => todo.id === id);

        const newTask = { ...task, done: true };

        fetch(URL_PUT, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newTask),
        })
        .then((response) => {
            if (!response.ok) {
            throw new Error("Erro ao realizar o PUT");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Put bem-sucedido");
            setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? data : todo))
            );
        })
        .catch((error) => {
            throw new Error("Erro ao atualizar task");
        });
  };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'pending') return !todo.done;
        if (filter === 'completed') return todo.done;
        return true;
    });

    useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchTodos();
  }, [filter]);


    return (  
        <div className="container">
            <h1>Minhas Tarefas</h1>
            
            <div className="first-row">
                <AddTodo onAddTodo={addTodo} />
            </div>

            <TodoFilter onFilterChange={setFilter} />

            <ul id="todo-list" className="todo-list">
                {filteredTodos.length === 0 ? (
                    <p>
                        {filter === 'pending' && "Não há nenhuma tarefa pendente."}
                        {filter === 'completed' && "Não há nenhuma tarefa concluída."}
                        {filter === 'all' && "Não há nenhuma tarefa."}
                    </p>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo} 
                            onToggleComplete={markTodoAsDone}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export {TodoList};