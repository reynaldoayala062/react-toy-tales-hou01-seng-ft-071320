import React, { Component } from 'react';
import toyData from '../data';

class ToyCard extends Component {

  state = {
    id: this.props.toy.id,
    name: this.props.toy.name,
    image: this.props.toy.image,
    likes: this.props.toy.likes
  }

  handleDelte = () => {
    this.props.deleteToy(this.props.toy)
  }

  handleLikes = () => {
    this.setState({
      ...this.state.likes,
      likes: this.state.likes + 1
    },
    () => this.submitLikes()
    )
  }

  submitLikes = () => {
    this.props.increaseLike(this.state)
  }

  render() {
    return (
      <div className="card">
        <h2>{this.props.toy.name}</h2>
        <img src={this.props.toy.image} alt={this.props.toy.name} className="toy-avatar" />
        <p>{this.props.toy.likes} Likes </p>
        <button onClick={this.handleLikes} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleDelte} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
