// src/actions/games/update.js
import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { GAME_SQUARES_UPDATED } from './subscribe'

const api = new API()

export default (game) => {
  return (dispatch) => {
    dispatch({ type: APP_LOADING })

    api.patch(`/games/${game._id}`, {})
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })

        dispatch({
          type: GAME_SQUARES_UPDATED,
          payload: {
            game,
            players: result.body
          }
        })


      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
