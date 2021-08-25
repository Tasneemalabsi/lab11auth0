import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export class ButtonCompo extends Component {
    
    render() {
        console.log(this.props.book);
        return (
            <div key={this.props.idx}>
            
                
                <Button onClick={()=>this.props.deleteBooks(this.props.book._id)}>Delete</Button>
                <Button onClick={()=>{this.props.updateBooks(this.props.book._id)}}>Update</Button>
            </div>
        )
    }
}

export default ButtonCompo
