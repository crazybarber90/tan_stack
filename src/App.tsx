import './App.css'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { addTodo, fetchTodos } from './api'
import TodoCard from './components/TodoCard'
import React, { useState } from 'react'

function App() {
  const [title, setTitle] = useState('')
  const queryClient = useQueryClient()

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ['todos'],
  })

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      const todosQueryKey = ['todos'] as const
      queryClient.invalidateQueries(todosQueryKey as InvalidateQueryFilters)
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <button
          onClick={async () => {
            try {
              await addTodoMutation({ title })
              setTitle('')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          Add Todo
        </button>
      </div>
      {todos?.map((todo) => {
        console.log('TOOOODDOOOO', todo)
        return <TodoCard key={todo.id} todo={todo} />
      })}
    </div>
  )
}

export default App
