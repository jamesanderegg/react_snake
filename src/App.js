import React, { Component } from 'react';
import Snake from './Snake'
import Food from './Food'

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  console.log(x,y)
  return [x,y]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: 'RIGHT',
  snakeDots: [
    [0,0],
    [2,0]
  ]
}
class App extends Component {

  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

// We need to check out of bounds on each itteration
  componentDidUpdate() {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'})
        break;
      case 40:
          this.setState({direction: 'DOWN'})
          break;
      case 37:
          this.setState({direction: 'LEFT'})
          break;
      case 39:
          this.setState({direction: 'RIGHT'})
          break;
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
    }
    // add heads to the copy of snakeDots
    dots.push(head);
    // remove first item of the array(the tail) with shift
    dots.shift()
    //set new dots array to the state (snakeDots)
    this.setState({
      snakeDots: dots
    })
  }

  checkIfOutOfBorders() {
    //get the head of the snake by getting the last item in the snakeDot array 
    let head = this.state.snakeDots[this.state.snakeDots.length-1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      //set alert for if statement
      this.onGameOver();
    }
  }

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] == dot[0] && head[1] == dot[1]){
        this.onGameOver()
      }
    })

  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`);
    this.setState(initialState)
  }

  render(){
    return (
      <div className="game-area">
        <Snake snakeDots={this.state.snakeDots}/>
        <Food dot ={this.state.food}/>
      </div>
    );
  }
}

export default App;
