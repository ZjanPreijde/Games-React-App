export const UPDATE_GAME = 'UPDATE_GAME'

export default (updatedGame) => {
  return {
    type: UPDATE_GAME,
    payload: updatedGame
  }
}
