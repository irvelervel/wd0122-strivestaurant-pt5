import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import dishes from '../data/menu.json'
import PastaComments from './PastaComments'

// I'm loading this component on a variety of routes, e.g:
// /detail/0
// /detail/3
// the ID of the pasta tells us which details to show!
// we must retrieve that ID from the url (:pastaId) and use it to fetch the right details to show...

const PastaDetail = () => {
  const params = useParams()
  console.log('PARAMS OBJECT: ', params)

  const navigate = useNavigate()

  // params.pastaId is the id of the pasta that redirected us here!!

  // now we have to use params.pastaId to figure out which details to load...
  // componentDidMount -> useEffect(() => {}, [])

  const [pastaDetails, setPastaDetails] = useState(null) // 1)

  // null it's the initial value. Then, after the useEffect, pastaDetails
  // will become an object OR undefined, if the .find on dishes can't find a match (we should warn the user)

  useEffect(() => {
    // 2)
    // here we're going to load the info to show, thanks to pastaId
    let pastaIdToFind = params.pastaId // 0 || 3 || 2 --> from the URL, a string
    // since we have all the pastas in the menu.json, we're just going to find the right one in there!
    let rightPastaDish = dishes.find(
      (pasta) => pasta.id.toString() === pastaIdToFind
    ) // without the .toString() on pasta.id we're trying to compare a string to a number!
    // with .toString() now we're comparing a string to a string, and that works!
    console.log('rightPastaDish', rightPastaDish)
    // let's put rightPastaDish into the state, so we can display it in the JSX!
    setPastaDetails(rightPastaDish)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col md={8} className="text-center">
          {pastaDetails ? (
            <Card>
              <Card.Img variant="top" src={pastaDetails.image} />
              <Card.Body>
                <Card.Title>{pastaDetails.name}</Card.Title>
                <Card.Text>{pastaDetails.description}</Card.Text>
                <h5>REVIEWS:</h5>
                <PastaComments selectedPasta={pastaDetails} />
                <Button variant="primary" onClick={() => navigate('/menu')}>
                  Select another one!
                </Button>
              </Card.Body>
            </Card>
          ) : typeof pastaDetails === 'undefined' ? (
            // the user didn't click on a pasta to come here....
            <Navigate to="/not-found" />
          ) : (
            <Spinner variant="info" animation="border" />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default PastaDetail
