const mongoose = require("mongoose")

const TodoSchema = new mongoose.Schema({
    id:{
        type: String,
        require: true,
    },
    text:{
        type: String,
        require: true,
    }
})

const Todos = mongoose.model("Todos", TodoSchema)
export default Todos;