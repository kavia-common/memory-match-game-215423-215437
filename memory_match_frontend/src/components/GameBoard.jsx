import React from 'react';
import Card from './Card';

/**
 * GameBoard component
 * - Renders a responsive grid of cards
 * - Receives game state and click handler from parent
 */
// PUBLIC_INTERFACE
function GameBoard({ deck, rows, cols, flipped, matched, onCardClick, victory }) {
  const gridStyle = {
    gridTemplateRows: `repeat(${rows}, minmax(72px, 1fr))`,
    gridTemplateColumns: `repeat(${cols}, minmax(72px, 1fr))`,
  };

  return (
    <section
      className={`board ${victory ? 'dimmed' : ''}`}
      style={gridStyle}
      role="grid"
      aria-label="Memory cards grid"
    >
      {deck.map((card, index) => {
        const isFlipped = flipped.includes(index) || matched.has(index);
        const disabled = matched.has(index) || victory;
        return (
          <Card
            key={card.id}
            index={index}
            value={card.value}
            flipped={isFlipped}
            disabled={disabled}
            onClick={() => onCardClick(index)}
            aria-posinset={index + 1}
            aria-setsize={deck.length}
          />
        );
      })}
    </section>
  );
}

export default GameBoard;
