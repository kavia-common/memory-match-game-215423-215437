import React, { useEffect, useMemo, useState } from 'react';
import './styles/theme.css';
import './styles/app.css';
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import Footer from './components/Footer';

/**
 * Memory Match App
 * - Provides game state, timer, move count, and restart handler
 * - Renders Header, GameBoard, and Footer
 */
const EMOJIS = ['🐶','🐱','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵'];

function useTimer(running) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);
  const reset = () => setSeconds(0);
  return { seconds, reset };
}

// PUBLIC_INTERFACE
function App() {
  /** Game setup: choose deck size. 4x4 uses 8 pairs. 6x4 uses 12 pairs. */
  const [rows, setRows] = useState(4);
  const [cols, setCols] = useState(4);
  const pairsCount = useMemo(() => Math.floor((rows * cols) / 2), [rows, cols]);

  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]); // indices of currently flipped (max 2)
  const [matched, setMatched] = useState(new Set()); // set of indices matched
  const [moves, setMoves] = useState(0);
  const [running, setRunning] = useState(false);
  const [victory, setVictory] = useState(false);
  const [lockBoard, setLockBoard] = useState(false);

  const { seconds, reset: resetTimer } = useTimer(running);

  // Initialize deck
  const generateDeck = () => {
    const selection = EMOJIS.slice(0, pairsCount);
    const pairDeck = [...selection, ...selection]
      .map((emoji, i) => ({ id: i + '-' + emoji, value: emoji }))
      .sort(() => Math.random() - 0.5);
    return pairDeck;
  };

  const startNewGame = (newRows = rows, newCols = cols) => {
    setRows(newRows);
    setCols(newCols);
    const newPairs = Math.floor((newRows * newCols) / 2);
    const selection = EMOJIS.slice(0, newPairs);
    const pairDeck = [...selection, ...selection]
      .map((emoji, i) => ({ id: `${i}-${emoji}-${Date.now()}`, value: emoji }))
      .sort(() => Math.random() - 0.5);
    setDeck(pairDeck);
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setVictory(false);
    setRunning(false);
    resetTimer();
    // slight delay for better UX before starting timer on first flip
  };

  useEffect(() => {
    // initial mount
    startNewGame(rows, cols);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle card click
  const onCardClick = (index) => {
    if (lockBoard) return;
    if (flipped.includes(index)) return;
    if (matched.has(index)) return;
    if (victory) return;

    // Start timer on first move
    if (!running) setRunning(true);

    const newFlipped = [...flipped, index].slice(0, 2);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      setMoves((m) => m + 1);
      const [i1, i2] = newFlipped;
      const isMatch = deck[i1].value === deck[i2].value;
      if (isMatch) {
        const newMatched = new Set(matched);
        newMatched.add(i1);
        newMatched.add(i2);
        setMatched(newMatched);
        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
          // Check victory
          if (newMatched.size === deck.length) {
            setVictory(true);
            setRunning(false);
          }
        }, 400);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
        }, 900);
      }
    }
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    startNewGame(rows, cols);
  };

  // PUBLIC_INTERFACE
  const handleChangeSize = (size) => {
    if (size === '4x4') startNewGame(4, 4);
    if (size === '6x4') startNewGame(6, 4);
  };

  const stats = {
    moves,
    seconds,
    victory,
    sizeLabel: `${rows}x${cols}`,
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <Header
          title="Memory Match"
          onRestart={handleRestart}
          onChangeSize={handleChangeSize}
          stats={stats}
        />
        <main className="main-content">
          <GameBoard
            deck={deck}
            rows={rows}
            cols={cols}
            flipped={flipped}
            matched={matched}
            onCardClick={onCardClick}
            victory={victory}
          />
          {victory && (
            <div
              role="status"
              aria-live="polite"
              className="victory-banner"
              data-testid="victory-banner"
            >
              <div className="confetti" aria-hidden="true">🎉</div>
              <h2>Great job!</h2>
              <p>
                You matched all pairs in {moves} moves and {seconds}s.
              </p>
              <button className="btn primary" onClick={handleRestart} aria-label="Play again">
                Play again
              </button>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
