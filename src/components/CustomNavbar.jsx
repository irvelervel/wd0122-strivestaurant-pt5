import { Navbar, Nav, Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// in a functional component, you're going to receive ALL the props
// in an object received as the argument of the component function!

// const CustomNavbar = ({ title }) => {
//     return (
//       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//         <Navbar.Brand href="#home">{title}</Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="#contact">Contact</Nav.Link>
//             <Nav.Link href="#menu">Menu</Nav.Link>
//             <Nav.Link href="#info">Info</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//     )
//   }

// if your functional component is just returning some JSX, you can
// omit the return statement and the curly brackets altogether!

const CustomNavbar = ({ title }) => {
  const location = useLocation()
  console.log(location)
  // location.pathname is always going to tell you WHERE you are in the application!

  const navigate = useNavigate()
  // navigate allows you to programmatically change route via code!

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {/* Link renders in the dom a special anchor tag */}
      <Link to="/">
        <Navbar.Brand>{title}</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/form" className="custom-links">
            <div
              className={
                location.pathname === '/form' ? 'nav-link active' : 'nav-link'
              }
            >
              Form
            </div>
          </Link>
          <Link to="/reservations" className="custom-links">
            <div
              className={
                location.pathname === '/reservations'
                  ? 'nav-link active'
                  : 'nav-link'
              }
            >
              Reservations
            </div>
          </Link>
          <Link to="/menu" className="custom-links">
            <div
              className={
                location.pathname === '/menu' ? 'nav-link active' : 'nav-link'
              }
            >
              Menu
            </div>
          </Link>
          <Button onClick={() => navigate('/')}>HOME</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default CustomNavbar
