import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
      case "SET":
          return action.payload
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const AppContext = createContext()

export const AppContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <AppContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContext