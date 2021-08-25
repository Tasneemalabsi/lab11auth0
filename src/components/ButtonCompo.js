import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export class ButtonCompo extends Component {

    deleteData = () =>{
        this.props.deleteBooks(this.props.book._id)
    }


    render() {
        return (
            <div key={this.props.index}>
            {/* {this.props.book.title}
            {this.props.book.description}
            {this.props.book._id} */}
                <Button onClick={()=>this.deleteData}>Delete</Button>
            </div>
        )
    }
}

export default ButtonCompo
