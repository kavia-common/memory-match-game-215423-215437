import React from 'react';

/**
 * Header component
 * - Shows title, size selector, restart button
 * - Displays moves and timer
 */
// PUBLIC_INTERFACE
function Header({ title, onRestart, onChangeSize, stats }) {
  const { moves, seconds, sizeLabel } = stats ?? {};
  return (
    <header className="header" role="banner">
      <div className="header-left">
        <h1 className="app-title" aria-label={title}>{title}</h1>
        <div className="size-selector" role="group" aria-label="Board size selector">
          <button
            className={`btn ghost ${sizeLabel === '4x4' ? 'active' : ''}`}
            onClick={() => onChangeSize('4x4')}
            aria-pressed={sizeLabel === '4x4'}
          >
            4x4
          </button>
          <button
            className={`btn ghost ${sizeLabel === '6x4' ? 'active' : ''}`}
            onClick={() => onChangeSize('6x4')}
            aria-pressed={sizeLabel === '6x4'}
          >
            6x4
          </button>
        </div>
      </div>
      <div className="header-right">
        <div className="stats" aria-label="Game statistics">
          <div className="stat">
            <span className="stat-label">Moves</span>
            <span className="stat-value" data-testid="moves">{moves}</span>
          </div>
          <div className="divider" aria-hidden="true" />
          <div className="stat">
            <span className="stat-label">Time</span>
            <span className="stat-value" data-testid="timer">{seconds}s</span>
          </div>
        </div>
        <button className="btn primary" onClick={onRestart} aria-label="Restart game">
          Restart
        </button>
      </div>
    </header>
  );
}

export default Header;
