import Duren from '../DurenLogic.js'

const DurenGame = new Duren();

export const gettAll = () => DurenGame.playDeck;

export const getPlayers = () => DurenGame.playersLeft;

export const getTurn = () => ({
    index: DurenGame.currentPlayerIndex,
    name: DurenGame.getCurrentPlayer().name,
});

export const skipTurn = (playerIndex) => {
    if (playerIndex != DurenGame.currentPlayerIndex) return null;

    DurenGame.skipTurn()
    return getTurn();
}

export const discardAndDraw = (playerIndex) =>{
    if (playerIndex != DurenGame.currentPlayerIndex) return null;

    DurenGame.discardAndDraw()
    return getPlayers(), gettAll();
}