import React, { useEffect, useState } from 'react'
import styles from './todoList.module.scss'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'

const syncReactToLocal = (handldeNewTodos) => {
  const todosString = localStorage.getItem('todos')
  const todosObj = JSON.parse(todosString || '[]')
  const newTodosObj = handldeNewTodos(todosObj)
  localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
  const [todos, setTodos] = useState([]) //gia tri khoi tao la mang rong
  const [currentTodo, setCurrentTodo] = useState(null) //gia tri khoi tao la null
  const doneTodos = todos.filter((todo) => todo.done)
  const notdoneTodos = todos.filter((todo) => !todo.done)

  useEffect(() => {
    const todosString = localStorage.getItem('todos')
    const todosObj = JSON.parse(todosString || '[]')
    setTodos(todosObj)
  }, [])

  const addTodo = (name) => {
    const todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTodos((prev) => [...prev, todo])
    const handler = (todosObj) => {
      return [...todosObj, todo]
    }
    syncReactToLocal(handler)
  }
  //thay doi trang thai viec can lam, nhan vao id cua todo task va trang thai của task
  // tra ve cac gia tri cua task và trang thai moi
  const handleDoneTodo = (id, done) => {
    const handler = (prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done }
        }
        return todo
      })
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  // console.log(todos)

  const startEditTodo = (id) => {
    const findedTodo = todos.find((todo) => todo.id === id)
    if (findedTodo) {
      setCurrentTodo(findedTodo)
    }
  }

  const editTodo = (name) => {
    setCurrentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }

  const finishEditTodo = () => {
    const handler = (todoObj) => {
      return todoObj.map((todo) => {
        if (todo.id === currentTodo.id) return currentTodo
        return todo
      })
    }
    setTodos(handler)
    setCurrentTodo(null)
    syncReactToLocal(handler)
  }

  const deleteTodo = (id) => {
    if (currentTodo) {
      setCurrentTodo(null)
    }
    const handler = (todoObj) => {
      const findIndexTodo = todoObj.findIndex((todo) => todo.id === id)
      if (findIndexTodo > -1) {
        const result = [...todoObj]
        result.splice(findIndexTodo, 1)
        return result
      }
      return todoObj
    }
    setTodos(handler)
    syncReactToLocal(handler)
  }

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} currentTodo={currentTodo} editTodo={editTodo} finishEditTodo={finishEditTodo} />
        <TaskList
          todos={notdoneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
        <TaskList
          doneTaskList
          todos={doneTodos}
          handleDoneTodo={handleDoneTodo}
          startEditTodo={startEditTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  )
}
