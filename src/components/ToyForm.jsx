import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: "",
    likes: 0
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    },
    () => this.submitToy()
    )
  }

  submitToy = () => {
    let toy = this.state
    this.setState({
      name: "",
      image: "",
      likes: 0
    })
    this.props.createToy(toy)
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={(e) => this.handleSubmit(e)}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input  type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
