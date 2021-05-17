import express from 'express';
import {getTodoList, createTodoList, deleteTodoList, updateTodoList} from '../controllers/todolist.js'
const router = express.Router();

router.get('/',getTodoList);
router.post('/',createTodoList);
router.delete('/:id',deleteTodoList);
router.patch('/:id',updateTodoList);
export default router;