import styles from './taskList.module.scss'

export default function TaskList(props) {
  const { doneTaskList, todos, handleDoneTodo, startEditTodo, deleteTodo } = props

  const onChangeCheckBox = (idTask) => (event) => {
    handleDoneTodo(idTask, event.target.checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Complete' : 'Incomplete'}</h2>
      <div className={styles.tasks}></div>
      {todos.map((todo) => (
        <div className={styles.tasks} key={todo.id}>
          <input
            type='checkbox'
            className={styles.taskCheckbox}
            checked={todo.done}
            onChange={onChangeCheckBox(todo.id)}
          />
          <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
          <div className={styles.taskAction}>
            <button className={styles.taskBtn} onClick={() => startEditTodo(todo.id)}>
              📝
            </button>
            <button className={styles.taskBtn} onClick={() => deleteTodo(todo.id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
