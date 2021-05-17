import { Draggable, Droppable } from 'react-beautiful-dnd';
import Todo from './Todo';

const TodoList = ({ id, name, todos, setListID, setTodoList,todoList }) => {
    const deleteListHandler = () => {
        var listid = id.toString();
        setTodoList(todoList.filter((list) => list.id.toString() !== listid));
    };
    return (

        <div className="list-container">
            <button className="btn close" onClick={deleteListHandler}><span>X</span></button>
            <h3>{name}</h3>
            <Droppable droppableId={`${id.toString()}`}>

                {(provided) => (
                    <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {todos.map((todo, index) => {
                            return (
                                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Todo text={todo.text} todo={todo} todoList={todoList} setTodoList={setTodoList} listId={id.toString()}/>
                                        </li>

                                    )}
                                </Draggable>

                            )

                        })}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
            <button className="btn-add-todo" type="button" data-toggle="modal" data-target="#addtaskModel" onClick={() => {setListID(id.toString())}}>
                <i className="fas fa-plus"></i>
                <p>Add a task</p>
            </button>
        </div>

    );
};




export default TodoList;