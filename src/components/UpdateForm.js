import React, { Component } from 'react'

class UpdateForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.updateInfo}>
                    <input type="text" name='booktitle' defaultValue={this.props.bookInfo.title} />
                    <input type="text" name='description' defaultValue={this.props.bookInfo.description} />
                    <input type="submit" value="Update book" />
                </form>
            </div>
        )
    }
}

export default UpdateForm