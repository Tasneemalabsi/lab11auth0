import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class MyFavoriteBooks extends React.Component {

  
constructor (props){
  super (props);
  this.state = {
    books : []
  }
}

componentDidMount = async() => {
  // let email = 'tasneem.alabsi@gmail.com'
  const user = this.props.auth0;
  console.log(user);
  console.log(user.user.email);
  let booksData = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${user.user.email}`)
  this.setState ({
    books: booksData.data
  })
  console.log(this.state.books);
}


  render() {
    return(
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        
        {this.state.books.map((book, index)=>
         {return(
          <Card style={{ width: '18rem' }} key={index}>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
             {book.description}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>)}
            )}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
