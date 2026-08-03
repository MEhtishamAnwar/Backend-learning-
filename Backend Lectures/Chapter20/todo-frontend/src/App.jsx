import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import { addItemToServer } from "./services/itemService";
import { getItemsFromServer } from "./services/itemService";
import { deleteItemFromServer } from "./services/itemService";
import "./App.css";
import { useState , useEffect} from "react";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  useEffect(() => {
    getItemsFromServer().then(intialItems => {
      setTodoItems(intialItems);
    });
  }, []);



  const handleNewItem = async (itemName, itemDueDate) => {
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);

    const Item = await addItemToServer(itemName, itemDueDate);
    // console.log("Server Response:", serverItem);
    const newTodoItems = [
      ...todoItems,
      Item,
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    try {
      const deletedId = await deleteItemFromServer(id);
      setTodoItems((currentItems) => currentItems.filter((item) => item.id !== deletedId));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-shell">
        <AppName />
        <AddTodo onNewItem={handleNewItem} />
        {todoItems.length === 0 && <WelcomeMessage />}
        <TodoItems
          todoItems={todoItems}
          onDeleteClick={handleDeleteItem}
        />
      </div>
    </div>
  );
}

export default App;
