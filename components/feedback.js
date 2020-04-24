import React from "react";
import { Alert } from "react-bootstrap";

class Feedback extends React.Component {
  render() {
    if (this.props.show && this.props.operation == "favorite") {
      return (
        <Alert variant="success" show={true}>
          {this.props.title} is added to favorites
        </Alert>
      );
    } else if (this.props.show && this.props.operation === "remove") {
      return (
        <Alert variant="warning" show={true}>
          {this.props.title} has been removed from favorites
        </Alert>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Feedback;
