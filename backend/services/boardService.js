import Duren from '../game/DurenLogic.js'

const DurenGame = new Duren();

export const gettAll = () => DurenGame.playDeck;

export const getPlayers = () => DurenGame.playersLeft;

export const getTurn = () => ({
    index: DurenGame.currentPlayerIndex,
    name: DurenGame.getCurrentPlayer()?.name ?? null,
    phase: DurenGame.phase,
    attackerIndex: DurenGame.attackerIndex,
    attacker: DurenGame.getAttacker()?.name ?? null,
    defenderIndex: DurenGame.defenderIndex,
    defender: DurenGame.getDefender()?.name ?? null,
});

export const getInfo = () => DurenGame.getInfo();

export const attackCard = (playerIndex, card) => {
    if (playerIndex !== DurenGame.currentPlayerIndex || DurenGame.phase !== "attack") {
        return null;
    }
    if (!DurenGame.attack(card)) return null;
    return getInfo();
};

export const defendCard = (playerIndex, card) => {
    if (playerIndex !== DurenGame.currentPlayerIndex || DurenGame.phase !== "defend") {
        return null;
    }
    if (!DurenGame.defend(card)) return null;
    return getInfo();
};

export const endDefense = (playerIndex) => {
    if (playerIndex !== DurenGame.defenderIndex) return null;
    if (!DurenGame.endDefense()) return null;
    return getInfo();
};

export const surrenderDefense = (playerIndex) => {
    if (playerIndex !== DurenGame.defenderIndex) return null;
    if (!DurenGame.surrenderDefense()) return null;
    return getInfo();
};

export const resetGame = () => {
    DurenGame.reset();
    return {
        turn: getTurn(),
        info: getInfo(),
        players: getPlayers(),
        deck: gettAll(),
    };
}