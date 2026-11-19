import Player from "./PlayerLogic.js";

const suits = ["wino", "kier", "pik", "trefl"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default class Duren {
    constructor() {
        this.players = ["Bert", "Hubert", "Bubi"].map((name) => new Player(name));
        this.playersLeft = this.players;
        this.currentPlayerIndex = 0;

        this.playDeck = [];
        this.remainingCards = 0;
        this.kozyrCard = null;
        this.kozyr = null;
        this.table = [];

        this.createDeck();
        this.getKozyr();
        this.deal();
    }

    playerAt(index) {
        return this.playersLeft[index] ?? null;
    }

    getCurrentPlayer() {
        return this.playerAt(this.currentPlayerIndex);
    }

    playersLeftCount() {
        return this.playersLeft.length;
    }

    nextPlayer(index) {
        const n = this.playersLeft.length;
        if (n === 0) return 0;
        return (index + 1) % n;
    }

    skipTurn() {
        if (this.playersLeft.length === 0) return;
        this.currentPlayerIndex = this.nextPlayer(this.currentPlayerIndex);
    }

    discardAndDraw() {
        const player = this.getCurrentPlayer();
        if (!player || player.hand.length === 0) return;

        player.hand.splice(0, 1);
        if (this.playDeck.length > 0) {
            const drawn = this.drawFromDeck();
            if (drawn) player.hand.push(drawn);
        }
    }

    rankValue(rank) {
        return ranks.indexOf(rank);
    }

    isKozyr(card) {
        return card?.s === this.kozyr;
    }

    canBeat(attack, defence) {
        if (!attack || !defence) return false;

        if (!isKozyr(attack) && isKozyr(defence)) return true;
        if (attack.s == defence.s) return this.rankValue(attack.r) < this.rankValue(defence.r);
        return false;
    }

    createDeck() {
        const deck = suits.flatMap((s) => ranks.map((r) => ({ s, r })));
        this.shuffle(deck);
        this.playDeck = deck;
        this.remainingCards = deck.length;
    }

    shuffle(_deck) {
        for (let i = 0; i < _deck.length - 1; i++){
            let j = Math.floor(Math.random()*52);
            let tmp = _deck[i];
            _deck[i] = _deck[j];
            _deck[j] = tmp; 
        }
    }

    getKozyr() {
        if (this.playDeck.length === 0) return;
        this.kozyrCard = this.playDeck[0];
        this.kozyr = this.kozyrCard.s;
    }

    drawFromDeck() {
        if (this.playDeck.length === 0) return null;
        if (this.playDeck.length === 1) this.kozyrCard = null;
        this.remainingCards--;
        return this.playDeck.pop();
    }

    deal() {
        for (let card = 0; card < 6; card++) {
            for (const player of this.players) {
                const drawn = this.drawFromDeck();
                if (drawn) player.hand.push(drawn);
            }
        }
    }

    getPlayerHands() {
        return this.players.map((player) => ({
            name: player.name,
            cards: [...player.hand],
        }));
    }

    getInfo() {
        const current = this.getCurrentPlayer();
        return {
            kozyr: this.kozyr,
            kozyrCard: this.kozyrCard,
            remainingCards: this.remainingCards,
            currentPlayerIndex: this.currentPlayerIndex,
            currentPlayer: current?.name ?? null,
        };
    }

    reset() {
        for (const player of this.players) {
            player.hand.length = 0;
        }
        this.playersLeft = this.players;
        this.currentPlayerIndex = 0;
        this.table.length = 0;
        this.createDeck();
        this.getKozyr();
        this.deal();
    }

    duren() {
        if (this.playersLeft.length === 1) {
            console.log(this.playersLeft[0].name + " jest durniem");
            return true;
        }
        return false;
    }
}