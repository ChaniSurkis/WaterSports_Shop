import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewAllProducts from './Components/features/products/viewAllProducts'
import Login from './Components/features/users/Login'
import HomePage from './Components/HomePage'
import RegisterForm from './Components/features/users/RegisterForm'
import ProductsByCategory from './Components/features/products/ProductByCategory';
import AddToCart from './Components/features/Cart/AddToCart';
import ViewCart from './Components/features/Cart/ViewCart';
import ProductById from './Components/features/Cart/ProductById';
import Header from './Components/Header';
import ProductDetail from './Components/features/products/ProductDetail';
import Footer from './Components/Footer';
import PaymentPage from './Components/features/Cart/PaymentPage'

function App() {


  return (
    <>

      {/* <ViewAllProducts></ViewAllProducts> */}
      {/* <Login></Login> */}

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/addToCart/:productId" element={<AddToCart></AddToCart>}></Route>
          <Route path="/category/:categoryName" element={<ProductsByCategory />} />
          <Route path="/ViewCart" element={<ViewCart />} />
          <Route path="/productById" element={<ProductById />} />
          <Route path="/productDetail/:id" element={<ProductDetail />} />

          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
