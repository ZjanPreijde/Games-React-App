// Core
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// Actions
import { fetchOneGame, fetchPlayers } from '../actions/games/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'

// import updateGame from '../actions/games/updateGame'

// components
import JoinGameDialog from '../components/games/JoinGameDialog'
import Board from './Board'
// Helpers
// import calculateWinner from './gameUtils'
// Styling
import './Game.css'

const playerShape = PropTypes.shape({
  userId: PropTypes.string.isRequired,
  symbol: PropTypes.string,
  playerSquares: PropTypes.arrayOf(PropTypes.number),
  name: PropTypes.string
})

class Game extends PureComponent {
  static propTypes = {
    fetchOneGame: PropTypes.func.isRequired,
    fetchPlayers: PropTypes.func.isRequired,
    subscribeToWebsocket: PropTypes.func.isRequired,
    game: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
      players: PropTypes.arrayOf(playerShape),
      draw: PropTypes.bool,
      updatedAt: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      started: PropTypes.bool,
      turn: PropTypes.number.isRequired,
      gameSquares: PropTypes.arrayOf(PropTypes.string)
    }),
    currentPlayer: playerShape,
    isPlayer: PropTypes.bool,
    isJoinable: PropTypes.bool,
    hasTurn: PropTypes.bool
  }

  componentWillMount() {
    const { game, fetchOneGame, subscribeToWebsocket } = this.props
    const { gameId } = this.props.match.params

    if (!game) { fetchOneGame(gameId) }
    subscribeToWebsocket()
  }

  componentWillReceiveProps(nextProps) {
    const { game } = nextProps

    if (game && !game.players[0].name) {
      this.props.fetchPlayers(game)
    }
  }

  // gameHandleClick(index) {
  //   console.log("gameHandleClick() called, (game<-Board<-Square)", 'index', index)
  //
  //   const squares = this.props.game.gameSquares.slice()
  //
  //   // We have a winner or square already filled
  //   if (calculateWinner(squares)) {
  //     console.log('Winner')
  //     return
  //   }
  //   if (!this.props.hasTurn) {
  //     console.log('Not this players turn')
  //     return
  //   }
  //   if (squares[index])  {
  //     console.log('Square already filled')
  //     return
  //   }
    // // Stuff I would like to send to update action
    // //  - value of games.gameSquare[index] to be updated
    // // Stuff action should update
    // //  - change hasTurn

  //   let newSquares = squares
  //   newSquares[index] = this.props.currentPlayer.symbol
  //
  //   console.log('gameHandleClick() =>'
  //     , 'index', index
  //     , " ", '->', this.props.currentPlayer.symbol, ':', newSquares[index])
  //   const newState = {
  //     _id: this.props.game._id,
  //     gameSquares: newSquares
  //   }
  //   updateGame(newState)
  // }

  render() {
    const { game } = this.props
    const currentUserName = this.props.currentUserName

    if (!game) return null

    const title = game.players
      .map(p => (p.name || null))
      .filter(n => !!n)
      .join(' is playing ')

    return (
      <div className="game-container">
        <div className="Game">
          <h1>Hi {currentUserName}, enjoy <em>Tic Tac Toe for squares</em></h1>
          <h2>{title}</h2>

          <Board
           // handleClick={(index) => this.gameHandleClick(index)}
           { ...this.props }
          />

          <JoinGameDialog gameId={game._id} />
        </div>
        <div className="debug-props">
          <h2>Debug Props from Game</h2>
          <pre>{JSON.stringify(this.props, true, 2)}</pre>
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, games }, { match }) => {
  const game          = games.filter((g) => (g._id === match.params.gameId))[0]
  const isPlayer      = game && game.players.filter((p) => (p.userId === currentUser._id)).length > 0
  const currentPlayer = game && game.players.filter((p) => (p.userId === currentUser._id))[0]
  const hasTurn       = !!currentPlayer && game.players[game.turn].userId === currentUser._id
  const currentUserName = currentUser.name
  return {
    game,
    currentPlayer,
    isPlayer,
    hasTurn,
    currentUserName,
    isJoinable: game && !currentPlayer && game.players.length < 2,
  }
}

export default connect(mapStateToProps, {
  subscribeToWebsocket,
  fetchOneGame,
  fetchPlayers,
  // updateGame,
})(Game)
