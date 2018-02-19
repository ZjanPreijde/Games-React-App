// src/components/games/CreateGameButton.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import StarIcon from 'material-ui/svg-icons/action/play-for-work'
import createGame from '../../actions/games/create'

class CreateGameButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateGameButton">
        <RaisedButton
          label="Start a New Game"
          primary={true}
          onClick={this.props.createGame}
          icon={<StarIcon />}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { createGame })(CreateGameButton)
