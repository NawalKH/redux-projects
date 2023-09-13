import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const updatedAnecdote = action.payload
      console.log(updatedAnecdote)
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote 
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    const anecdotetoChange = anecdotes.find(a => a.id === id)
    const changedAnecdote = { 
      ...anecdotetoChange, 
      votes: anecdotetoChange.votes + 1 
    }
    const newAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(addVote(newAnecdote))
  }
}

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer