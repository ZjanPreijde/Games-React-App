import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import calculateWinner from './gameUtils'

// import setSquare from '../actions/games/setSquare'
import updateGame from '../actions/games/updateGame'


// import Square from './Square'
function Square(props) {
  return (
    <button className='square' onClick={props.onClick.bind(this)}>
      {props.value}
    </button>
  )
}

class Board extends PureComponent {
  constructor(props) {
    super(props)

    // this.state = {
    //   gameSquares: Array(9).fill(null),
    //   hasTurn: true,
    //   xIsNext: true,
  }
  // };

  boardHandleClick(index) {
    console.log('boardHandleClick() called', 'index', index)

    // Return handling to game?
    // this.props.handleClick(index)

    const gameSquares = this.props.game.gameSquares.slice()
    const hasTurn     = this.props.hasTurn
    const xIsNext     = this.props.xIsNext
    if (calculateWinner(gameSquares)) {
      // We have a winner already
      console.log("We have a winner already")
      return
    }
    if (gameSquares[index]) {
      // Square played already
      console.log("Square is already clicked")
      return
    }
    if (!hasTurn) {
      // Square played already
      console.log("It is not your turn")
      return
    }


    gameSquares[index] = xIsNext ? 'X' : 'O'
    // this.setState({
    //   gameSquares: gameSquares,
    //   hasTurn: !hasTurn,
    //   xIsNext: !this.xIsNext,
    // })

    this.props.game.gameSquares = gameSquares

    const { updateGame, game } = this.props

    console.log('calling updateGame(game) ...')
    updateGame(game)
    console.log('boardHandleClick() done')
}

  renderSquare(index) {
    return (
      <Square
        value={this.props.game.gameSquares[index]}
        // index={index}
        onClick={() => this.boardHandleClick(index)}
      />
    )
  }

  render() {
    console.log('this.props from Board-render() :')
    console.log(this.props)

    const gameSquares = this.props.game.gameSquares.slice()
    const winner      = calculateWinner(gameSquares);
    const xIsNext     = this.props.xIsNext
    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O')
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
        <div className="debug-props">
          <h2>Debug Props from Board</h2>
          <pre>{JSON.stringify(this.props, true, 2)}</pre>
        </div>

      </div>
    );
  }
}

const mapStateToProps = ({ currentUser, games }, { match }) => {
  const game     = games.filter( (g) => (g._id === match.params.gameId) )[0]
  const isPlayer = game && game.players.filter((player) => (player.userId === currentUser._id)).length > 0

  return {
    game,
    currentUser,
    isPlayer,
    open: game && !isPlayer && game.players.length < 2
  }
}
export default connect(mapStateToProps, { updateGame })(Board)
