
const TodoItem = require("../models/todoItem");
exports.createTodoItem = async (req, res) => {
    console.log("Request body:", req.body);
  
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date });
    await todoItem.save();
    res.status(201).json(todoItem);
}

exports.getTodoItems = async (req, res) => {
  const todoItems = await TodoItem.find();
  res.json(todoItems);
};

exports.deleteTodoItem = async (req, res) => {
  const { id } = req.params;
  const deletedItem = await TodoItem.findByIdAndDelete(id);

  if (!deletedItem) {
    return res.status(404).json({ message: "Todo item not found" });
  }

  return res.status(200).json({ _id: id });
};

exports.updateTodoItem = async (req, res) => {
  const { id } = req.params;
  const todoItem = await TodoItem.findById(id);
  if (! todoItem) { 
    return res.status(404).json({ message: "Todo item not found" });
  } 
  todoItem.completed = !todoItem.completed;
  await todoItem.save();
  res.json(todoItem);       
}