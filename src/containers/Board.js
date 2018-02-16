import React, { PureComponent } from 'react'
import calculateWinner from './gameUtils'

// import Square from './Square'
function Square(props) {
  return (
    <button className='square' onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      gameSquares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  boardHandleClick(index) {
    console.log('boardHandleClick() called', 'index', index)

    // Return handling to game?
    // this.props.handleClick(index)

    const gameSquares = this.state.gameSquares.slice()
    if (calculateWinner) {
      // We have a winner already
      return
    }
    if (gameSquares[index]) {
      // Square played already
      return
    }
    squares[index] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      gameSquares: gameSquares,
      xIsNext: !this.xIsNext,
    })
  }

  renderSquare(index) {
    return (
      <Square
        value={this.state.gameSquares[index]}
        index={index}
        onClick={() => this.boardHandleClick(index)}
      />
    )
  }

  render() {
    const winner = calculateWinner(this.state.gameSquares);
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + this.state.xIsNext ? 'X' : 'O'
    }

    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

      </div>
    );
  }
}
export default Board
