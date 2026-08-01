export const addItemToServer = async (task, date  ) => {

    const response = await fetch("http://localhost:3004/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, date }),
    });
    const data = await response.json();
    return mapServerItemToLocalItem(data);
  }; 
  export const getItemsFromServer = async () => {
    const response = await fetch("http://localhost:3004/api/todo");
    const data = await response.json();
    return data.map(mapServerItemToLocalItem);
  };
  export const deleteItemFromServer = async (id) => {
  const response = await fetch(`http://localhost:3004/api/todo/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete item from server");
  }

  const data = await response.json().catch(() => null);
  return data?._id ?? id;
};
  

    export const updateTodoItem = async (id) => {
      const response = await fetch(`http://localhost:3004/api/todo/${id}/completed`, {
        method: "PUT",
      });
      const data = await response.json();
      return mapServerItemToLocalItem(data);
    };

  const mapServerItemToLocalItem = (serverItem) => {
    return{
       id: serverItem._id,
        name: serverItem.task,
        dueDate: serverItem.date,
        createdAt: serverItem.createdAt,
        completed: serverItem.completed,
        updatedAt: serverItem.updatedAt,
    }
  }
    