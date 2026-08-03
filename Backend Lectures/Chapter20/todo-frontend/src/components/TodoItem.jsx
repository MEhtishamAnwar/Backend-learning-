import styles from "./TodoItem.module.css";

function TodoItem({ id, todoName, todoDate, onDeleteClick }) {
  const formattedDate = todoDate
    ? new Date(todoDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className={styles.itemCard}>
      <div className={styles.itemMeta}>
        <span className={styles.itemName}>{todoName}</span>
        <span className={styles.itemDate}>{formattedDate}</span>
      </div>
      <button
        type="button"
        className={styles.deleteButton}
        onClick={() => onDeleteClick(id)}
      >
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
