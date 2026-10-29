import Player from "./PlayerLogic.js";

export default class Duren {
    constructor() {
        this.playDeck = this.createDeck();
        this.players = ["Bert", "Hubert", "Bubi"].map((name) => new Player(name));
        this.currentPlayerIndex = 0;
        this.deal();
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    skipTurn() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }

    discardAndDraw() {
        const player = this.getCurrentPlayer();
        if (player.hand.length === 0) return;

        player.hand.splice(0, 1);
        if (this.playDeck.length > 0) {
            player.hand.push(this.playDeck.pop());
        }
    }

    createDeck() {
        const suits = ['wino', 'kier', 'pik', 'trefl'];
        const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        const deck = suits.flatMap(s => ranks.map(r => ({s, r})));
        this.shuffle(deck);
        return deck;
    }

    shuffle(_deck) {
        for (let i = 0; i < _deck.length - 1; i++){
            let j = Math.floor(Math.random()*52);
            let tmp = _deck[i];
            _deck[i] = _deck[j];
            _deck[j] = tmp; 
        }
    }

    deal(c) {
        for (let card = 0; card < 6; card++) {
            for (const player of this.players) {
                player.hand.push(this.playDeck.pop());
            }
        }
    }

    getPlayerHands() {
        return this.players.map((player) => ({
            name: player.name,
            cards: [...player.hand],
        }));
    }
}