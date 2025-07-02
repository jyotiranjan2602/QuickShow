import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Movies from './Pages/Movies'
import MovieDetails from './Pages/MovieDetails'
import SeatLayout from './Pages/SeatLayout'
import MyBooking from './Pages/MyBooking'
import Favorite from './Pages/Favorite'
import {Toaster} from 'react-hot-toast'
import Footer from './Components/Footer'
import Layout from './Pages/Admin/Layout'
import Dashboard from './Pages/Admin/Dashboard'
import AdminShow from './Pages/Admin/AdminShow'
import ListShow from './Pages/Admin/ListShow'
import ListBookings from './Pages/Admin/ListBookings'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
      { !isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/Movies' element={ <Movies/> } />
        <Route path='/movies/:id' element={ <MovieDetails/> } />
        <Route path='/movies/:id/:date' element={ <SeatLayout/> } />
         <Route path='/mybookings' element={ <MyBooking/> } />
          <Route path='/favorite' element={ <Favorite/> } />
          <Route path='/admin/*' element={<Layout/>}>
            <Route index element={<Dashboard/>} />
            <Route path='add-shows' element={<AdminShow/>} />
            <Route path='list-show' element={<ListShow/>} />
            <Route path='list-bookings' element={<ListBookings/>} />
          </Route>
      </Routes>
      { !isAdminRoute && <Footer />}
    </>
  )
}

export default App
