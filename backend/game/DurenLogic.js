import Player from "./PlayerLogic.js";

const suits = ["wino", "kier", "pik", "trefl"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export default class Duren {
    constructor() {
        this.players = ["Bert", "Hubert", "Bubi"].map((name) => new Player(name));
        this.playersLeft = this.players;
        this.currentPlayerIndex = 0;
        this.attackerIndex = 0;
        this.defenderIndex = 0;
        this.phase = "attack";

        this.playDeck = [];
        this.remainingCards = 0;
        this.kozyrCard = null;
        this.kozyr = null;
        this.attackStack = [];
        this.defenceStack = [];
        this.table = [this.attackStack, this.defenceStack];

        this.createDeck();
        this.getKozyr();
        this.deal();
        this.attackerIndex = this.currentPlayerIndex;
        this.defenderIndex = this.nextPlayer(this.currentPlayerIndex);
        
    }

    getCurrentPlayer() {
        return this.playerAt(this.currentPlayerIndex);
    }

    getDefender() {
        return this.playerAt(this.defenderIndex);
    }

    getAttacker() {
        return this.playerAt(this.attackerIndex);
    }

    playersLeftCount() {
        return this.playersLeft.length;
    }

    playerAt(index) {
        return this.playersLeft[index] ?? null;
    }

    nextPlayer(index) {
        const n = this.playersLeft.length;
        if (n === 0) return 0;
        return (index + 1) % n;
    }

    updateTable() {
        this.table = [this.attackStack, this.defenceStack];
    }

    tableClear() {
        this.attackStack.length = 0;
        this.defenceStack.length = 0;
        this.updateTable();
    }

    Defending() {
        return this.attackStack.length > this.defenceStack.length;
    }

    allDefended() {
        return (
            this.attackStack.length > 0 &&
            this.attackStack.length === this.defenceStack.length
        );
    }

    defendAttackCard() {
        if (!this.Defending()) return null;
        return this.attackStack[this.defenceStack.length];
    }

    rankValue(rank) {
        return ranks.indexOf(rank);
    }

    isKozyr(card) {
        return card?.s === this.kozyr;
    }

    canBeat(attack, defence) {
        if (!attack || !defence) return false;

        if (!this.isKozyr(attack) && this.isKozyr(defence)) return true;
        if (attack.s === defence.s) {
            return this.rankValue(attack.r) < this.rankValue(defence.r);
        }
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

    removeFromHand(player, card) {
        const index = player.hand.findIndex(
            (c) => c.s === card.s && c.r === card.r
        );
        if (index === -1) return null;
        return player.hand.splice(index, 1)[0];
    }

    attack(card) {
        if (this.phase !== "attack") return false;
        if (this.currentPlayerIndex !== this.attackerIndex) return false;
        if (this.Defending()) return false;

        const player = this.getAttacker();
        const played = this.removeFromHand(player, card);
        if (!played) return false;
        if (this.attackStack.length === 0) {
            this.attackerIndex = this.currentPlayerIndex;
            this.defenderIndex = this.nextPlayer(this.attackerIndex);
        }

        this.attackStack.push(played);
        this.updateTable();
        this.phase = "defend";
        this.currentPlayerIndex = this.defenderIndex;
        return true;
    }

    defend(card) {
        if (this.phase !== "defend") return false;
        if (this.currentPlayerIndex !== this.defenderIndex) return false;

        const attackCard = this.defendAttackCard();
        if (!attackCard) return false;

        const player = this.getDefender();
        const played = this.removeFromHand(player, card);
        if (!played) return false;
        if (!this.canBeat(attackCard, played)) {
            player.hand.push(played);
            return false;
        }

        this.defenceStack.push(played);
        this.updateTable();
        return true;
    }

    endDefense() {
        if (this.phase !== "defend") return false;
        if (this.currentPlayerIndex !== this.defenderIndex) return false;
        if (!this.allDefended()) return false;

        const winner = this.defenderIndex;
        this.tableClear();
        this.phase = "attack";
        this.currentPlayerIndex = winner;
        this.attackerIndex = winner;
        this.defenderIndex = this.nextPlayer(this.attackerIndex);
        return true;
    }

    surrenderDefense() {
        if (this.phase !== "defend") return false;
        if (this.currentPlayerIndex !== this.defenderIndex) return false;
        if (this.attackStack.length === 0) return false;

        const defender = this.getDefender();
        defender.hand.push(...this.attackStack, ...this.defenceStack);
        this.tableClear();

        this.phase = "attack";
        this.currentPlayerIndex = this.nextPlayer(this.defenderIndex);
        this.attackerIndex = this.currentPlayerIndex ;
        this.defenderIndex = this.nextPlayer(this.attackerIndex);
        return true;
    }

    getInfo() {
        const current = this.getCurrentPlayer();
        return {
            kozyr: this.kozyr,
            kozyrCard: this.kozyrCard,
            remainingCards: this.remainingCards,
            currentPlayerIndex: this.currentPlayerIndex,
            currentPlayer: current?.name ?? null,
            attackerIndex: this.attackerIndex,
            attacker: this.getAttacker()?.name ?? null,
            defenderIndex: this.defenderIndex,
            defender: this.getDefender()?.name ?? null,
            phase: this.phase,
            table: this.table,
            canEndDefense: this.phase === "defend" && this.allDefended(),
        };
    }

    reset() {
        for (const player of this.players) {
            player.hand.length = 0;
        }
        this.playersLeft = this.players;
        this.currentPlayerIndex = 0;
        this.phase = "attack";
        this.attackStack.length = 0;
        this.defenceStack.length = 0;
        this.updateTable();
        this.createDeck();
        this.getKozyr();
        this.deal();
        this.attackerIndex = this.currentPlayerIndex;
        this.defenderIndex = this.nextPlayer(this.currentPlayerIndex);
    }

    duren() {
        if (this.playersLeft.length === 1) {
            console.log(this.playersLeft[0].name + " jest durniem");
            return true;
        }
        return false;
    }
}