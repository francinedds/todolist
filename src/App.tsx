import './style.css'
import { ChangeEvent, useState } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [newTodo, setNewTodo] = useState('')

  const [editedTodo, setEditedTodo] = useState<Todo>()

  const [parent] = useAutoAnimate()
  const [parentEdit] = useAutoAnimate()

  function addTodo() {
    setTodos([
      ...todos,
      {
        id: todos.length,
        title: newTodo,
        completed: false,
      },
    ])
    setNewTodo('')
  }

  function handleDelete(id: number) {
    setTodos(todos.filter((todo) => todo.id != id))
  }

  function handleSelectTodo(todo: Todo) {
    setEditedTodo(todo)
  }

  function handleEdit() {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editedTodo!.id) {
          return editedTodo!
        }
        return todo
      })
    )
    setEditedTodo(undefined)
  }

  function handleCheck(id: number) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo
      })
    )
  }

  function handleChangeTodo(event: ChangeEvent<HTMLInputElement>) {
    setNewTodo(event.target.value)
  }

  return (
    <div className="flex items-center justify-center flex-col pt-16">
      <main className='w-[440px] bg-white rounded-xl p-8 shadow-lg'>
        <header>
          <h1 className="flex items-center justify-center text-teal-700 font-medium text-3xl">TODO LIST</h1>
        </header>

        <div className="content-box">
          <input className="py-2 px-4 border-gray-400 border-2 rounded-md outline-none text-gray-500" type="text" value={newTodo} onChange={handleChangeTodo} placeholder="Nova tarefa"/>
          <button className="bg-teal-700 shadow-lg" onClick={addTodo}>
            Adicionar
          </button>
        </div>

        <div ref={parentEdit}>
          {editedTodo ? (
            <div className="content-box">
              <input
                className="py-2 px-4 border-gray-400 border-2 rounded-md outline-none text-gray-500" type="text" value={editedTodo?.title} onChange={(event) => 
                  setEditedTodo({ ...editedTodo!, title: event.target.value })
                }
                placeholder="Nova tarefa"
              />
              <button className="bg-gray-700 shadow-lg" onClick={handleEdit}>
                Confirmar
              </button>
            </div>
          ) : null}
        </div>

        <div ref={parent}>
          {todos.map((todo) => (
            <div className="w-full flex justify-between content-center mb-2" key={todo.id}>
              <input type="checkbox" onChange={() => handleCheck(todo.id)} checked={todo.completed}/>
              <p title={todo.title} className={`flex items-center text-lg line-clamp-1 px-8 text-gray-500 ${todo.completed ? 'line-through' : ''}`}> {todo.title} </p>
              <div className='flex'>
                <button className="bg-gray-700 shadow-lg" onClick={() => handleSelectTodo(todo)}>
                  Editar
                </button>
                <button className="bg-red-600 ml-2 shadow-lg" onClick={() => handleDelete(todo.id)}>
                  Remover
                </button>
              </div>
            </div>
          ))}

        </div>
      </main>
    </div>
  )
}

export default App
