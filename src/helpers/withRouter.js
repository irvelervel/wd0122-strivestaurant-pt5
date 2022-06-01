import { useLocation, useNavigate, useParams } from 'react-router-dom'

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation()
    let navigate = useNavigate()
    let params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
  // ComponentWithRouterProp is an ENRICHED VERSION of your original class component!
  // carrying over all the original props, and adding to the mix location, navigate and params!! :O
}

export default withRouter
// withRouter creates a HOC -> Higher Order Component
