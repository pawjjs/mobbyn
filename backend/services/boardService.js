import Duren from '../game/DurenLogic.js'

const DurenGame = new Duren();

export const gettAll = () => DurenGame.playDeck;

export const getPlayers = () => DurenGame.playersLeft;

export const getTurn = () => ({
    index: DurenGame.currentPlayerIndex,
    name: DurenGame.getCurrentPlayer().name,
});

export const getInfo = () => DurenGame.getInfo();

export const skipTurn = (playerIndex) => {
    if (playerIndex != DurenGame.currentPlayerIndex) return null;

    DurenGame.skipTurn();
    return getTurn();
}

export const discardAndDraw = (playerIndex) =>{
    if (playerIndex != DurenGame.currentPlayerIndex) return null;

    DurenGame.discardAndDraw();
    return { players: getPlayers(), deck: gettAll() };
}

export const resetGame = () => {
    DurenGame.reset();
    return {
        turn: getTurn(),
        info: getInfo(),
        players: getPlayers(),
        deck: gettAll(),
    };
}