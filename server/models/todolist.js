import mongoose from 'mongoose';

const TodolistSchema = mongoose.Schema({
    id: {
    type: String,
    require: true,
    },
    name: {
        type: String,
        require: true,
    },
    todos: [{
        id:{
            type: String,
            require: true,
        },
        text:{
            type: String,
            require: true,
        }
    }],
})

const TodoList = mongoose.model("Todolist", TodolistSchema);
export default TodoList;