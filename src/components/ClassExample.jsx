import { Component } from 'react'
import withRouter from '../helpers/withRouter'
import { Button } from 'react-bootstrap'

class ClassExample extends Component {
  render() {
    return (
      <div>
        <h1>CLASS COMPONENT!</h1>
        <p>My location is: {this.props.router.location.pathname}</p>
        <Button onClick={() => this.props.router.navigate('/')}>GO HOME</Button>
      </div>
    )
  }
}

export default withRouter(ClassExample)

// navigate, location, params...? how do they work in a class component?
// withRouter is going to ENRICH the props of ClassExample!
// these additional props are NOT coming from App!
