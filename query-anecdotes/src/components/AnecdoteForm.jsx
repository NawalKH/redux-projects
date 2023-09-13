import { useMutation, useQueryClient  } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

import { useContext } from "react"
import AppContext from '../AppContext'


const AnecdoteForm = () => {

  const [notification, notificationDispatch] = useContext(AppContext)

    //for adding/modifying data
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      notificationDispatch({ type:'SET', payload:`too short anecdote, must have length 5 or more` })
    setTimeout(() => {
      notificationDispatch({type:'CLEAR'})
    }, "5000");
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newNoteMutation.mutate({ content, votes: 0 })
    
    notificationDispatch({ type:'SET', payload:`you created new anecdote ${content} !` })
    setTimeout(() => {
      notificationDispatch({type:'CLEAR'})
    }, "5000");
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
