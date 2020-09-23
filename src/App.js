import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }
  
  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => this.setState({
      ...this.state,
      toys: toys
    }))
  }


  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  deleteToy = (toyD) => {
    fetch(`http://localhost:3000/toys/${toyD.id}`, {
      method: "DELETE"
    })
    let newArray = this.state.toys.filter(toy => {
      return toy.id !== toyD.id
    })
    this.setState({
      ...this.state.toys,
      toys: newArray
    })
  }

  createToy = (toy) => {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(toyObj => this.setState({
      ...this.state,
      toys: [...this.state.toys, toyObj]
    }))
  }

  increaseLike = (toy) => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(resp => resp.json())
    .then(toyObj => {

      const updatedToyArray = [...this.state.toys].map(toy => {
        if( toy.id === toyObj.id){
          return toyObj
        } else {
          return toy
        }
      })

      this.setState({
        ...this.state,
        toys: updatedToyArray
      })
    })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} increaseLike={this.increaseLike}/>
      </>
    );
  }

}

export default App;
