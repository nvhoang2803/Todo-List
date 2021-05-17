import TodoList from "../models/todolist.js";


export const getTodoList = async (req, res) => {
    try{
        
        const allTodoList = await TodoList.find();
        res.send(allTodoList);
        res.status(200).json(allTodoList);
    } catch (error){
        res.status(404);
    }   
}

export const createTodoList = async (req, res) => {
    const todolist = req.body;
    console.log(req.body);
    const newTodolist = new TodoList(todolist);
    
    try {
        await newTodolist.save();
        res.status(201).json(newTodolist);
    } catch (error){
        res.status(409).json({message: error.message});
    };
}

export const deleteTodoList = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        const todolist = await TodoList.findOne({id: id});
        await todolist.delete();
        res.send('Successfully Deleted');
    }catch (error) {
        console.log(error);
    }

}

export const updateTodoList = async (req, res) => {
    const id = req.params.id;
    console.log(req.body);
     const new_object = req.body;
     try {
         const todolist = await TodoList.findOne({id: id});
         await todolist.updateOne({$set: new_object});
         res.send('Successfully updated');
     }catch (error) {
         console.log(error);
     }

}