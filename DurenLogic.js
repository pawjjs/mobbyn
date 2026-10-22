export default class Duren {
    constructor() {
        this.playDeck = this.createDeck();
        this.players = ["Bert", "Hubert", "Bubi"];
        this.deal = this.deal();
        this.karta = "git karta";
    }

    createDeck() {
        const suits = ['wino', 'kier', 'pik', 'trefl'];
        const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        const deck = suits.flatMap(s => ranks.map(r => ({s, r})))
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

    deal(){
        
    }
}