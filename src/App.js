import './App.css'
// importing the bootstrap css file is required!
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReservationsList from './components/ReservationsList'
import ReservationForm from './components/ReservationForm'
import NotFound from './components/NotFound'
import Menu from './components/Menu'

// the curly brackets are necessary for importing a component that has been
// exported NOT as default
// you DON'T need the curly brackets if you're importing something that HAS
// been exported as default!

const App = () => {
  return (
    <BrowserRouter>
      {/* BrowserRouter is just a virtual wrapper, let's wrap everything into it! */}
      <>
        {/* the navbar should always load in the website */}
        <CustomNavbar title="Strivestaurant" />
        {/* instead Home is going to be wrapped into Routes because it won't always appear! */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservations" element={<ReservationsList />} />
          <Route path="/form" element={<ReservationForm />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/detail/:pastaId" element={<Detail />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
