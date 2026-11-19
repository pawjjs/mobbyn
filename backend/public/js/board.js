const turnDiv = document.getElementById("turn")
const infoDiv = document.getElementById("info")
const tableDisplay = document.getElementById("table_display")
const playersDiv = document.getElementById("players")

let gameInfo = null;
let pickingDefenseCard = false;

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

async function loadInfo() {
    if (!infoDiv) return;
    try {
        const res = await fetch('/api/board/info');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const info = await res.json();
        const prevPhase = gameInfo?.phase;
        gameInfo = info;
        if (prevPhase !== info.phase) pickingDefenseCard = false;
        renderInfo(info);
        renderTable(info);
    } catch (err) {
        infoDiv.textContent = "Info not loaded";
        console.error(err);
    }
}

function renderInfo(info) {
    infoDiv.replaceChildren();
    if (!info) return;

    const header = document.createElement('p');
    header.textContent = 'Informacje o grze';
    infoDiv.appendChild(header);

    const lines = [
        `Kozyr: ${info.kozyr ?? "-"}`,
        `Kart w talii: ${info.remainingCards}`,
        `Faza: ${info.phase === 'defend' ? 'obrona' : 'atak'}`,
        `Atakujący: ${info.attacker ?? "-"}`,
        `Obrońca: ${info.defender ?? "-"}`,
    ];

    for (const text of lines) {
        const p = document.createElement("p");
        p.textContent = text;
        infoDiv.appendChild(p);
    }
}

function renderTable(info) {
    if (!tableDisplay) return;
    tableDisplay.replaceChildren();

    const attacks = info.table?.[0] ?? [];
    const defences = info.table?.[1] ?? [];

    if (attacks.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Pusto';
        tableDisplay.appendChild(li);
        return;
    }

    const defenderTurn =
        info.phase === 'defend' &&
        gameInfo?.defenderIndex === gameInfo?.currentPlayerIndex;

    for (let i = 0; i < attacks.length; i++) {
        const li = document.createElement('li');
        const atk = attacks[i];
        let text = `${atk.s} ${atk.r}`;

        const def = defences[i];
        if (def) {
            text += ` | obrona: ${def.s} ${def.r}`;
        }

        li.textContent = text;

        if (!def && defenderTurn && i === defences.length) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.textContent = 'Broń';
            btn.addEventListener('click', () => {
                pickingDefenseCard = true;
                renderInfo(info);
                loadPlayers();
            });
            li.appendChild(document.createTextNode(' '));
            li.appendChild(btn);
        }

        tableDisplay.appendChild(li);
    }
}

async function loadPlayers() {
    try {
        const res = await fetch('/api/board/players')
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const players = await res.json();
        renderPlayers(players)
    } catch (err) {
        playersDiv.textContent = "Players not loaded";
        console.error(err);
    }
}

async function postAttack(playerIndex, card) {
    const res = await fetch('/api/board/attack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerIndex, card }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Atak nie wyszedł');
        return false;
    }
    pickingDefenseCard = false;
    return true;
}

async function postDefend(playerIndex, card) {
    const res = await fetch('/api/board/defend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerIndex, card }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Obrona nie wyszła');
        return false;
    }
    pickingDefenseCard = false;
    return true;
}

function renderPlayers(players){
    playersDiv.replaceChildren();

    const intro = document.createElement('p');
    intro.textContent = 'Gracze';
    playersDiv.appendChild(intro);

    if (players.length === 0) {
        playersDiv.textContent = 'No players';
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

        const showAttack =
            gameInfo?.phase === 'attack' &&
            gameInfo?.attackerIndex === currentPlayerIndex &&
            gameInfo?.currentPlayerIndex === currentPlayerIndex;

        const showPickDefense =
            pickingDefenseCard &&
            gameInfo?.phase === 'defend' &&
            gameInfo?.defenderIndex === currentPlayerIndex &&
            gameInfo?.currentPlayerIndex === currentPlayerIndex;

        for (const { s, r } of player.hand) {
            const card = document.createElement('li')
            card.className = `${s} ${r}`;
            card.textContent = `${s} ${r}`;

            if (showAttack) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = 'Rzuć';
                btn.addEventListener('click', async () => {
                    const ok = await postAttack(currentPlayerIndex, { s, r });
                    if (ok) await refreshBoard();
                });
                card.appendChild(document.createTextNode(' '));
                card.appendChild(btn);
            }

            if (showPickDefense) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.textContent = 'Obron się';
                btn.addEventListener('click', async () => {
                    const ok = await postDefend(currentPlayerIndex, { s, r });
                    if (ok) await refreshBoard();
                });
                card.appendChild(document.createTextNode(' '));
                card.appendChild(btn);
            }

            hand.appendChild(card)
        }

        const showDefendActions =
            gameInfo?.phase === 'defend' &&
            gameInfo?.defenderIndex === currentPlayerIndex &&
            gameInfo?.currentPlayerIndex === currentPlayerIndex;

        section.append(name, hand);

        if (showPickDefense) {
            const cancel = document.createElement('button');
            cancel.type = 'button';
            cancel.textContent = 'Anuluj';
            cancel.addEventListener('click', () => {
                pickingDefenseCard = false;
                loadInfo();
                loadPlayers();
            });
            section.appendChild(cancel);
        }

        if (showDefendActions && gameInfo?.canEndDefense) {
            const endBtn = document.createElement('button');
            endBtn.type = 'button';
            endBtn.textContent = 'Zakończ obronę';
            endBtn.addEventListener('click', () => postEndDefense(currentPlayerIndex));
            section.appendChild(endBtn);
        }

        if (showDefendActions && (gameInfo?.table?.[0]?.length ?? 0) > 0) {
            const surBtn = document.createElement('button');
            surBtn.type = 'button';
            surBtn.textContent = 'Poddaj się';
            surBtn.addEventListener('click', () => postSurrender(currentPlayerIndex));
            section.appendChild(surBtn);
        }

        playersDiv.appendChild(section)

        playerIndex++;
    }
}

async function postEndDefense(playerIndex) {
    const res = await fetch('/api/board/defense/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerIndex }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Nie można zakończyć obrony');
        return;
    }
    pickingDefenseCard = false;
    await refreshBoard();
}

async function postSurrender(playerIndex) {
    const res = await fetch('/api/board/defense/surrender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerIndex }),
    });
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error ?? 'Nie można się poddać');
        return;
    }
    pickingDefenseCard = false;
    await refreshBoard();
}

async function refreshBoard() {
    await loadInfo();
    await loadTurn();
    await loadPlayers();
}

async function resetGame() {
    try {
        const res = await fetch('/api/board/reset', { method: 'POST' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        pickingDefenseCard = false;
        await refreshBoard();
    } catch (err) {
        console.error('reset failed:', err);
    }
}

const resetBtn = document.getElementById('reset_game');
if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
}

refreshBoard();