import React, {useState} from 'react';


const Todo = ({ text, todo, todoList, setTodoList, listId }) => {
    const [isShown, setIsShown] =useState(false);

    const deleteHandler = (e) => {
        const items = Array.from(todoList);

        var new_items = items.map((item) => {
          if (item.id.toString() === listId){
            return {
              ...item,
              todos: item.todos.filter((item) => item.id !== todo.id)
            }
          }
          return item;
        });
        setTodoList(new_items);
    };

    return (
        <div className="todo" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <div className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</div>
            {
                isShown && (<button onClick={deleteHandler} className={`option-btn ${isShown ? "shown" : ""}`}><i className="fas fa-trash"></i></button>)
            }
            
        </div>
    );
};

export default Todo;