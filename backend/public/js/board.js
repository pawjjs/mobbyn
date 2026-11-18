const turnDiv = document.getElementById("turn")
const card_list = document.getElementById("cards");
const playersDiv = document.getElementById("players")

async function loadTurn() {
    try {
        const res = await fetch('/api/board/turn')
        if (!res.ok) throw new Error('HTTP ${res.status}');
        const turn = await res.json();
        renderTurn(turn)
    } catch (err) {
        turnDiv.textContent = "Turn not loaded";
        console.error(err);
    }    
}

function renderTurn(turn){
    turnDiv.replaceChildren();

    if (!turn || !turn.name){
        turnDiv.textContent = 'Nobodys turn';
        return;
    }

    const turn_h = document.createElement('h3');
    turn_h.className = 'turn header';
    turn_h.textContent = `Tura gracza ${turn.name}`;
    turnDiv.appendChild(turn_h);
}


async function loadCards() {
    try {
        const res = await fetch('/api/board/cards')
        if (!res.ok) throw new Error('HTTP ${res.status}');
        const cards = await res.json();
        renderCards(cards)
    } catch (err) {
        card_list.textContent = "Cards not loaded";
        console.error(err);
    }
}

function renderCards(cards){
    card_list.replaceChildren();

    if (cards.length === 0) {
        card_list.textContent = 'No cards';
        return;
    } 

    for (const card of cards) {
        const li = document.createElement('li');
        li.className = `${card.s} ${card.r}`;
        li.textContent = `${card.s} ${card.r}`;
        card_list.appendChild(li);
    }
}

async function loadPlayers() {
    try {
        const res = await fetch('/api/board/players')
        if (!res.ok) throw new Error('HTTP ${res.status}');
        const players = await res.json();
        renderPlayers(players)
    } catch (err) {
        playersDiv.textContent = "Players not loaded";
        console.error(err);
    }
}

function renderPlayers(players){
    playersDiv.replaceChildren();

    if (players.length === 0) {
        gamer_list.textContent = 'No players';
        return;
    } 

    let playerIndex = 0;

    for (const player of players) {
        const currentPlayerIndex = playerIndex;
        const section = document.createElement('section');
        section.className = 'player'

        const name = document.createElement('h3');
        name.textContent = player.name;

        const hand = document.createElement('ol');
        hand.className = 'hand';
        hand.replaceChildren();
        for (const {s, r} of player.hand){
            const card = document.createElement('li')
            card.className = `${s} ${r}`;
            card.textContent = `${s} ${r}`;
            hand.appendChild(card)
        }

        const skip_btn = document.createElement('button')
        skip_btn.className = 'skip_btn'
        skip_btn.textContent = 'Skip'
        skip_btn.addEventListener('click', () => skipTurn(currentPlayerIndex));

        const discard_btn = document.createElement('button')
        discard_btn.className = 'discard_btn'
        discard_btn.textContent = 'Wyrzuć'
        discard_btn.addEventListener('click', () => discardAndDraw(currentPlayerIndex));
        
        section.append(name, hand, skip_btn, discard_btn)
        playersDiv.appendChild(section)

        playerIndex++;
    }
}

async function skipTurn(playerIndex) {
    try {
        const res = await fetch(`/api/board/turn/skip/${playerIndex}`, { method: 'POST' });
        if (res.status === 403) {
            console.warn('Not your turn');
            return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        await loadTurn();
    } catch (err) {
        console.error('skip failed:', err);
    }
}

async function discardAndDraw(playerIndex) {
    try {
        const res = await fetch(`/api/board/turn/discar/${playerIndex}`, { method: 'POST' });
        if (res.status === 403) {
            console.warn('Not your turn');
            return;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        await loadPlayers(), loadCards();
    } catch (err) {
        console.error('discard failed:', err);
    }
}

loadTurn()
loadPlayers()
loadCards()