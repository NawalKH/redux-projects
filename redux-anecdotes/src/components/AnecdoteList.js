import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({ filter, anecdotes }) => {
        const searchValue = filter.toLowerCase()
        return anecdotes.filter (anecdote => anecdote.content.toLowerCase().includes(searchValue))
      })

    const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch()


    const addvote = (anecdote) => {
        dispatch(vote(anecdote.id))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => addvote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList