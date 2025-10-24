import React from 'react';

/**
 * Card component
 * - Button with front/back faces and flip animation
 */
// PUBLIC_INTERFACE
function Card({ index, value, flipped, disabled, onClick, ...ariaProps }) {
  return (
    <button
      type="button"
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={onClick}
      disabled={disabled || flipped}
      aria-label={flipped ? `Card showing ${value}` : 'Hidden card'}
      aria-disabled={disabled}
      {...ariaProps}
    >
      <div className="card-inner">
        <div className="card-face card-back" aria-hidden={flipped ? 'true' : 'false'}>
          <span className="card-back-pattern" />
        </div>
        <div className="card-face card-front" aria-hidden={flipped ? 'false' : 'true'}>
          <span className="emoji" role="img" aria-label={value}>
            {value}
          </span>
        </div>
      </div>
    </button>
  );
}

export default Card;
