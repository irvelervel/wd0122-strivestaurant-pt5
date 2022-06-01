import { Badge, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import dishes from '../data/menu.json'

const Menu = () => (
  <Container>
    {dishes.map((dish) => (
      <Row key={dish.id} className="justify-content-center">
        <Col md={8} className="text-center my-3">
          <Link to={'/detail/' + dish.id}>
            <img src={dish.image} alt="pasta pic" />
          </Link>
          <h4>
            {dish.name}
            <Badge variant="warning" className="mx-2">
              {dish.price}
            </Badge>
            <Badge variant="danger">{dish.label}</Badge>
          </h4>
        </Col>
      </Row>
    ))}
  </Container>
)

export default Menu
