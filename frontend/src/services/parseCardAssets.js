const SUIT_TO_CODE = {
  pik: 'S',
  trefl: 'C',
  kier: 'H',
  karo: 'D',
};

const RANK_TO_CODE = {
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10', 
  J: 'J',
  Q: 'Q',
  K: 'K',
  A: 'A',
};

export function getCardFileName(suit, rank) {
  const suitCode = SUIT_TO_CODE[String(suit).toLowerCase()];
  const rankCode = RANK_TO_CODE[String(rank).toLowerCase()] ?? RANK_TO_CODE[rank];

  if (!suitCode || !rankCode) {
    throw new Error(`Nieznana karta: suit="${suit}", rank="${rank}"`);
  }

  return `${rankCode}${suitCode}.png`; // np. getCardFileName('wino', 6) -> '6S.png'
}