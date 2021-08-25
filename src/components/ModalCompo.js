import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class ModalCompo extends Component {
   
  addBook = (event) => {
    this.props.addBooks(event)
    this.props.handleClose()
  }


    render() {
        return (
            <div>
               <Button onClick={this.props.show}>Add Books</Button>
        <Modal show={this.props.show} onHide={this.props.handleClose} >
      <Modal.Header closeButton={true} onClick={this.props.handleClose}>
      <Modal.Title>add your favorite book</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={this.props.addBook}>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
    <Form.Label>add a book</Form.Label>
    <Form.Control type="textarea" name='bookName'  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>add a short description</Form.Label>
    <Form.Control as="textarea" rows={2} name='shortDescription' />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
       
         </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={()=>{this.handleClose()}}>
        Close
      </Button>
     
    </Modal.Footer>
  </Modal> 
            </div>
        )
    }
}

export default withAuth0(ModalCompo);
