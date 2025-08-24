import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  status: 'idle',  // idle | loading | loggedIn | loggedOut | error
  errorMessage: null,
  role: 'user'  // הוספתי את שדה ה-role במצב ההתחלתי (ברירת מחדל 'user')
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.status = 'loading'
      state.errorMessage = null
    },
    loginSuccess(state, action) {
      state.currentUser = action.payload
      state.status = 'loggedIn'
      state.errorMessage = null
      
      // הוספת טיפול ב-role - אם אין role ב-action.payload, נשאיר 'user'
      state.role = action.payload.role ? action.payload.role : 'user'

      console.log(state.role)
    },
    loginFailure(state, action) {
      state.status = 'error'
      state.errorMessage = action.payload
    },
    logout(state) {
      state.currentUser = null
      state.status = 'loggedOut'
      state.errorMessage = null
      state.role = 'user'  // איפוס ה-role בלוגאאוט
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
export default userSlice.reducer




// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   currentUser: null,
//   status: 'idle',  // idle | loading | loggedIn | loggedOut | error
//   errorMessage: null,
//   role: 'user'
// }

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {
//     loginStart(state) {
//       state.status = 'loading'
//       state.errorMessage = null
//     },
//     loginSuccess(state, action) {
//       state.currentUser = action.payload
//       state.status = 'loggedIn'
//       state.errorMessage = null
//       console.log(state.currentUser.name)
//     },
//     loginFailure(state, action) {
//       state.status = 'error'
//       state.errorMessage = action.payload
//     },
//     logout(state) {
//       state.currentUser = null
//       state.status = 'loggedOut'
//       state.errorMessage = null
//     },
//   },
// })

// export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions
// export default userSlice.reducer
