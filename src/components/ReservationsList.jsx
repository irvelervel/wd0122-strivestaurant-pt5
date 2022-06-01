// we're still going to use a class for this component
// because we need the state, but also because we're going to fetch some data:
// fetching data for feeding a component MUST BE DONE in a specific spot
// and that spot is available JUST on class components!

import { useEffect, useState } from 'react'
import { ListGroup, Spinner, Alert, Container, Col, Row } from 'react-bootstrap'
// import ListGroup from 'react-bootstrap/ListGroup'
// this way would be the preferred one
import { parseISO, format } from 'date-fns'

// 1) we're going to create an empty state, for holding the reservations at a later point
// 2) create a binding, a connection between the STATE and the INTERFACE (the render() method)
// 3) now we have to fill the state! we have to fetch the reservations list and use this.setState to put them into the state
// 4) let's NOT launch our fetchReservations() function from render()... because render() fires again at every state change!
// 5) we should find a method that is guaranteed to be executed JUST ONCE!
// 6) that method is called componentDidMount, and if present, will be executed after the initial render() invokation!

// - first render invocation takes into the page the static elements: the title, the empty list, the side components
// - after the first render, componentDidMount gets executed automatically (if present!)
// - componentDidMount takes care of executing the fetch() because it's guaranteed to NOT be executed again!
// - after getting the data from the API, componentDidMount usually sets the state with the data
// - after setting the state, render() wakes up automatically and fires again. this time, the state is filled with the data!

const ReservationsList = () => {
  // state = {
  //   reservations: [],
  //   // what is going to be the INITIAL value of reservations?
  //   // reservations is ALWAYS going to be an array!
  //   // so let's initialize it as an EMPTY one!
  //   isLoading: true,
  //   isError: false,
  // }

  const [reservations, setReservations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  // componentDidMount = () => {
  //   console.log("I'm COMPONENTDIDMOUNT!")
  //   // this method is another reserverd keyword
  //   // this method is guaranteed to be executed JUST ONCE every time the component mounts!
  //   this.fetchReservations()
  //   // componentDidMount is mostly used to perform data fetching!
  // }

  useEffect(() => {
    console.log("I'm COMPONENTDIDMOUNT!")
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation'
      )
      if (response.ok) {
        // server answered with 200! :)
        let data = await response.json() // this gets the body out of the response, in order to use it!
        console.log('RESERVATIONS LIST!: ', data)
        // we have to use setState in order to change the state object!
        // this.setState({
        //   reservations: data,
        //   isLoading: false,
        // })
        setReservations(data)
        setIsLoading(false)
      } else {
        // server answered with an error code! :(
        console.log('error happened!')
        // this.setState({
        //   isLoading: false,
        //   isError: true,
        // })
        setIsLoading(false)
        setIsError(true)
      }
    } catch (error) {
      // falling here if we're not able to contact the server at all
      // (network issues?)
      console.log(error)
      // this.setState({
      //   isLoading: false,
      //   isError: true,
      // })
      setIsLoading(false)
      setIsError(true)
    }
  }

  // let's try to launch it from render()!
  // WRONG IDEA.
  // this is what happened: render() fires EVERY TIME the state changes.
  // this.fetchReservations() // <-- INFINITE LOOP
  console.log("I'm RENDER!")
  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>
          <div className="my-2 text-center">
            <h2>Booked tables!</h2>
            {/* let's create a connection between the Spinner and isLoading from the state: */}
            {/* I want them to be connected! */}
            {isError && (
              <Alert variant="danger">Aaw snap, an error happened!😖</Alert>
            )}
            {isLoading && <Spinner animation="border" variant="success" />}
            {/* the list will go here */}
            <ListGroup>
              {reservations.map((bookedTable, i) => (
                <ListGroup.Item key={i}>
                  {bookedTable.name} for {bookedTable.numberOfPeople} at{' '}
                  {format(
                    parseISO(bookedTable.dateTime),
                    'do MMMM yyyy | HH:mm'
                  )}
                </ListGroup.Item>
                // we'd like to take dateTime, which is a string representing a date,
                // and convert it into ANOTHER string.
                // the solution is going to take 2 steps:
                // 1) to convert the date string into a proper moment in time! (a.k.a. a Date object)
                // 2) to re-convert that moment in time into a BETTER string (more readable by humans)
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationsList
