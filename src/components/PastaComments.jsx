import { ListGroup } from 'react-bootstrap'

const PastaComments = ({ selectedPasta }) => (
  <ListGroup className="mb-3">
    {/* I want to generate as many ListGroup.Item as elements in the
      comments array living in the selectedPasta in the state */}
    {selectedPasta && // the short-circuit operator
      selectedPasta.comments.map((review, i) => (
        <ListGroup.Item key={i}>{review.comment}</ListGroup.Item>
      ))}
    {/* our page is crashing because initially this.state.selectedPasta
    is null, and we told our interface to map the comments of it! */}
    {/* you can fix it for example trying to read the comments property
    JUST if this.state.selectedPasta is not null... */}
    {/* DECLARATIVE APPROACH: we're telling the interface to ALWAYS
    map the comments out of the selected pasta */}
  </ListGroup>
)

export default PastaComments
