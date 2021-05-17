import React, { useState, useEffect } from 'react';
import './App.css';
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import { DragDropContext } from 'react-beautiful-dnd';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function App() {
  const [inputText, setInputText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [status, setStatus] = useState("all");
  const [listID, setListID] = useState("");
  const [inputTodo, setInputTodo] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    saveLocalTodos();
  }, [todoList, status]);

  const saveLocalTodos = () => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todoList") !== null)
      setTodoList(JSON.parse(localStorage.getItem("todoList")));
      console.log(todoList);
  };
  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination)
    return;
    const items = Array.from(todoList);
    var target;
    var new_items = items.map((item) => {
      if (item.id.toString() === result.source.droppableId){
        [target] = item.todos.filter((todo) => todo.id.toString() === result.draggableId);
        return {
          ...item,
          todos: item.todos.filter((todo) => todo.id.toString() !== result.draggableId)
        }
      }
      return item;
    });
    new_items = new_items.map((item) => {
      if (item.id.toString() === result.destination.droppableId){
        var todos = item.todos;
        todos.splice(result.destination.index, 0, target);
        return {
          ...item,
          todos: todos
        }
      }
      return item;
    });
    
    setTodoList(new_items);
  }
  const submitTodoHandler = (e) => {
    e.preventDefault();
    console.log(e);
    if (inputTodo !== ""){  
      setTodoList(todoList.map((list) => {
        if (list.id.toString() === listID){
          return {
            ...list,
            todos:[
              ...list.todos,
              {text: inputTodo,id: Math.random()*1000}
            ]
          };
        }
        else return list;
      }));
      setInputTodo("");
      
    }
    
};
  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <Form inputText={inputText} todoList={todoList} setTodoList={setTodoList} setInputText={setInputText} setStatus={setStatus} />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="content-container">
          {todoList.map((list) => (
            <TodoList key={list.id} id={list.id} name={list.name} todos={list.todos} setListID={setListID} setTodoList={setTodoList} todoList={todoList}/>
          ))}
        </div>


      </DragDropContext>
      
      <div className="modal fade " id="addtaskModel" tabIndex="-1" role="dialog" aria-labelledby="addtaskTitle" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addtaskTitle">Add a task</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <h3>Add a new task</h3>
                <input value={inputTodo} type="text" onChange={(e) => {setInputTodo(e.target.value)}}/>
              </form>
      </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" type="submit" onClick={submitTodoHandler}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
