import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonCompo from './components/ButtonCompo';

class MyFavoriteBooks extends React.Component {

  
constructor (props){
  super (props);
  this.state = {
    books : [],
    userEmail:'',
    show:false
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
     show:true
   });
  }

  deleteBooks = async(bookID2) =>{
    // let bookInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deletebooks?bookID=${bookID}`)
    let bookInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteCat/:${bookID2}?email=${this.state.userEmail}`)
    this.setState({
     books: bookInfo.data
    })
  }

  // handleShow = () => {
  //   this.setState({
  //     show:false
  //   })
  // }


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
                index={index}
                deleteData = {this.deleteBooks}
              />
          </Card.Body>
        </Card>)}
            )}
          

      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
