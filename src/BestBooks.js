import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';

import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ButtonCompo from './components/ButtonCompo';
import Button from 'react-bootstrap/Button';
import ModalCompo from './components/ModalCompo';
import UpdateForm from './components/UpdateForm';

class MyFavoriteBooks extends React.Component {

  
constructor (props){
  super (props);
  this.state = {
    books : [],
    userEmail:'',
    show:false,
    showUpdateForm:false,
    selectedBook2: {},
  }
}

componentDidMount = async() => {
  const user = this.props.auth0;
  console.log(user);
  console.log(user.user.email);
  let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${user.user.email}`)
  this.setState ({
    books: booksData.data,
    userEmail: user.user.email
  })
  console.log(this.state.userEmail);
}

addBooks = async (event) => {
  event.preventDefault();
  const user = this.props.auth0;
  
  let bookInfo = {
      title:event.target.bookName.value,
      description: event.target.shortDescription.value,
      email: this.state.userEmail
      }
  console.log(bookInfo);
  
   let bookData = await axios.post(`${process.env.REACT_APP_SERVER}/addbooks`,bookInfo);
   
    this.setState({
     books: bookData.data,
   });
  }

  deleteBooks = async(bookID2) =>{
    console.log('hello');
    console.log(bookID2);
    console.log(typeof(bookID2));
    let bookInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deletebooks/${bookID2}?email=${this.state.userEmail}`)
    console.log(bookInfo.data);
    this.setState({
     books: bookInfo.data
    })
  }

  handleShow = () => {
    this.setState({
      show:true
    })
  }

  handleClose = () => {
    this.setState({
      show:false
    })
  }

  updateBooks = (bookID) => {
     this.setState({
      showUpdateForm: false
    })

    let selectedBook = this.state.books.find(book => {
      if(book._id === bookID) return book;
    })
    this.setState({
      selectedBook2: selectedBook,
      showUpdateForm: true,
    })
  }

  updateBookInfo = async (event) => {
    event.preventDefault();
    let bookData = {
      title:event.target.booktitle.value,
      description: event.target.description.value,
      email: this.state.userEmail
    }

    let bookID = this.state.selectedBook2._id;
    let booksData = await axios.put(`${process.env.REACT_APP_SERVER}/updateBook/${bookID}`, bookData);
    this.setState({
      books: booksData.data
    })
  }


  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>

        <form onSubmit={this.addBooks}>
       <input type="text" name='bookName' placeholder='add your favorite book' />
       <input type="text" name='shortDescription' placeholder='add a short description' />
       <input type="submit" value="Add to favorites" />
         </form> 

        
        
        
        {this.state.books.map((book, index)=>
         {return(
          <Card style={{ width: '18rem' }} key={index}>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
             {book.description}
            </Card.Text>
            <ButtonCompo
                book={book}
          
                idx={index}
                deleteBooks = {this.deleteBooks}
                updateBooks= {this.updateBooks}
              />
          </Card.Body>
        </Card>)}
            )}

<UpdateForm
            bookInfo={this.state.selectedBook2}
            updateInfo={this.updateBookInfo}
          />


          

      </Jumbotron>
    )
  }
}

//          <Button onClick={this.handleShow}>Add Books</Button>
//          <Modal show={this.handleShow} onHide={this.handleClose} >
//        <Modal.Header closeButton={true} onClick={this.handleClose}>
//        <Modal.Title>add your favorite book</Modal.Title>
//      </Modal.Header>
//      <Modal.Body>
//      <Form onSubmit={this.addBooks}>
//    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" >
//      <Form.Label>add a book</Form.Label>
//      <Form.Control type="textarea" name='bookName'  />
//    </Form.Group>
//    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//      <Form.Label>add a short description</Form.Label>
//      <Form.Control as="textarea" rows={2} name='shortDescription' />
//    </Form.Group>
//    <Button variant="primary" type="submit">
//      Submit
//    </Button>
//  </Form>
        
//           </Modal.Body>
//      <Modal.Footer>
//        <Button variant="secondary" onClick={()=>{this.handleClose()}}>
//          Close
//        </Button>
      
//      </Modal.Footer>
//    </Modal> 


export default withAuth0(MyFavoriteBooks);
