import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from './userSlice'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const status = useSelector(state => state.userReducer.status)
  const error = useSelector(state => state.userReducer.errorMessage)
  const navigate = useNavigate()

  // ===== הוספתי את פרטי מנהל כאן =====
  const adminCredentials = {
    email: "admin@gmail.com",
    password: "123",
  }
  // ===============================

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    // ===== הוספתי בדיקה האם זה מנהל =====
    if (email === adminCredentials.email && password === adminCredentials.password) {
      dispatch(loginSuccess({ email, name: "Admin", role: "admin" }))
      navigate('/HomePage')
      return
    }    // ===============================

    try {
      const { data } = await axios.post('/api/user/login', {
        email,
        password
      })
      dispatch(loginSuccess(data))
      navigate('/HomePage')
    } catch (err) {
      dispatch(loginFailure("שם משתמש או סיסמה שגויים"))
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          backgroundImage: "url('/picLogin.png')",
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px',
          borderRadius: '12px',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          direction: 'rtl',
          color: 'white',
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>התחברות</h2>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="אימייל"
          type="email"
          required
          style={inputStyle}
        />

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="סיסמה"
          type="password"
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>התחבר</button>

        {status === 'loading' && <p style={{ textAlign: 'center' }}>טוען...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <p style={{ textAlign: 'center' }}>
          לא רשום? <Link to="/register" style={{ color: 'lightblue' }}>לחץ כאן</Link>
        </p>
      </form>
    </div>
  )
}

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none'
}

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
}







// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { loginStart, loginSuccess, loginFailure } from './userSlice'
// import { useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'

// export default function LoginForm() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const dispatch = useDispatch()
//   const status = useSelector(state => state.userReducer.status)
//   const error = useSelector(state => state.userReducer.errorMessage)
//   const navigate = useNavigate()

//   const handleLogin = async (e) => {
//     e.preventDefault()
//     dispatch(loginStart())

//     try {
//       const { data } = await axios.post('http://localhost:4000/user/login', {
//         email,
//         password
//       })
//       dispatch(loginSuccess(data))
//       navigate('/HomePage')
//     } catch (err) {
//       dispatch(loginFailure("שם משתמש או סיסמה שגויים"))
//     }
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//       <form
//         onSubmit={handleLogin}
//         style={{
//           backgroundImage: "url('/picLogin.png')", // נתיב לתמונה
//           backgroundColor: 'rgba(255, 255, 255, 0.4)',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           padding: '80px',
//           borderRadius: '12px',
//           boxShadow: '0 0 15px rgba(0,0,0,0.2)',
//           width: '100%',
//           maxWidth: '800px',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: '15px',
//           direction: 'rtl',
//           color: 'white', // טקסט לבן על רקע כהה
//         }}
//       >
//         <h2 style={{ textAlign: 'center', color: 'white' }}>התחברות</h2>

//         <input
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="אימייל"
//           type="email"
//           required
//           style={inputStyle}
//         />

//         <input
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="סיסמה"
//           type="password"
//           required
//           style={inputStyle}
//         />

//         <button type="submit" style={buttonStyle}>התחבר</button>

//         {status === 'loading' && <p style={{ textAlign: 'center' }}>טוען...</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//         <p style={{ textAlign: 'center' }}>
//           לא רשום? <Link to="/register" style={{ color: 'lightblue' }}>לחץ כאן</Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// const inputStyle = {
//   padding: '10px',
//   fontSize: '16px',
//   borderRadius: '5px',
//   border: '1px solid #ccc',
//   outline: 'none'
// }

// const buttonStyle = {
//   padding: '10px',
//   fontSize: '16px',
//   backgroundColor: '#4CAF50',
//   color: 'white',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer'
// }



// // import React, {useState}from 'react';
// // import { useDispatch, useSelector } from 'react-redux'
// // import { loginStart, loginSuccess, loginFailure } from './userSlice'
// // import axios from 'axios';
// // //import { useNavigate } from 'react-router-dom';

// // export default function Login({ onLoginSuccess }) {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errorMsg, setErrorMsg] = useState("");

// //  const handleLogin = async (e) => {
// //   e.preventDefault(); // מונע רענון הדף

// //   try {
// //     const response = await axios.post("http://localhost:4000/user/login", {
// //       email,
// //       password,
// //     });

// //     console.log("User exists:", response.data);
// //     setErrorMsg(""); // מנקה שגיאות אם היו

// //   } catch (error) {
// //     console.log("User does not exist or error:", error.response?.data || error.message);
// //     setErrorMsg(error.response?.data || "שגיאה לא צפויה. נסה שוב מאוחר יותר.");
// //   }
// // };


// //   return (
// //     <div style={{ maxWidth: 400, margin: "0 auto", padding: "1rem" }}>
// //       <h2>התחברות</h2>
// //       <form onSubmit={handleLogin}>
// //         <div>
// //           <label>אימייל:</label>
// //           <input
// //             type="email"
// //             value={email}
// //             required
// //             onChange={(e) => setEmail(e.target.value)}
// //           />
// //         </div>

// //         <div>
// //           <label>סיסמה:</label>
// //           <input
// //             type="password"
// //             value={password}
// //             required
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //         </div>

// //         <button type="submit">התחבר</button>

// //         {errorMsg && (
// //           <p style={{ color: "red", marginTop: "0.5rem" }}>{errorMsg}</p>
// //         )}
// //       </form>
// //     </div>
// //   );
// // }

// // const Login = () => {
// //     let nav = useNavigate()//יוזנביגייט זוהי פונקציה שמחזירה פונקציה שאפשר לשלוח לה
// //     // ניתובים והיא משרשרת אותם לכתובת של האתר

// //     let user = {
// //         email: "",
// //         password: ""
// //     }

// //     const check = () => {

// //         if (user.password.length >= 3 && user.name == "Tamar")
// //             nav("/list")
// //         // nav("/list")
// //         else
// //         //  חוזר לעמוד הבית
// //             nav('/') 
// //         // אם נשלח ניתוב ללא סלש- הניתוב ששלחנו ישתרשר לניתוב הקיים
// //         // אם נכתוב ניתוב עם סלש- הניתוב ששלחנו ידרוס את הניתוב הקיים 
// //     }

// // }
