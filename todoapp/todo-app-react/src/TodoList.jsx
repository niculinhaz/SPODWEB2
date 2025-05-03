import { useState } from 'react';

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
            {!todo.completed && (
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
    const [todos, setTodos] = useState([
        { id: 1, text: "Aprenda React", completed: false },
        { id: 2, text: "Aprenda JS", completed: false }
    ]);
    const [filter, setFilter] = useState('all');

    const addTodo = (text) => {
        const newTodo = { 
            id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
            text,
            completed: false 
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'pending') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

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
                            onToggleComplete={toggleTodo}
                        />
                    ))
                )}
            </ul>
        </div>
    );
};

export {TodoList};