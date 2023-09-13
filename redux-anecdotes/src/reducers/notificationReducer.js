import { createSlice } from '@reduxjs/toolkit'

const initialState = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
      addNotification(state, action) {
          return action.payload
      },
      removeNotification(state, action) {
          return ''
      }
  }
})

export const setNotification = (content, time) => {
    return dispatch => {
        dispatch(addNotification(content))
        console.log(content)
        setTimeout(() => {
            dispatch(removeNotification())
        }, (time*1000))
    }
}

export const { addNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer

