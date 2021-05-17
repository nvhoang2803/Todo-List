import axios from 'axios';
import React from 'react';

const Form = ({ setInputText, todoList, setTodoList, inputText }) => {
    const inputTextHandler = (e) => {
        console.log(e);
        setInputText(e.target.value);

    };
    const submitTodoListHandler = (e) => {
        e.preventDefault();
        if (inputText !== "") {
            setTodoList([
                ...todoList, { name: inputText, id: Math.random() * 1000, todos: [] }
            ]);
            const todoListId = (Math.random() * 1000).toString();
            setInputText("");
            axios.post('http://localhost:5000/todolist', {id: todoListId, name:inputText, todos:[]});
            
        }

    };
    return (
        <form>
            <h2>Add more field</h2>
            <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
            <button onClick={submitTodoListHandler} className="submit-btn" type="submit">
                <i className="fas fa-pencil-alt"></i>
            </button>

        </form>
    );


};
export default Form;