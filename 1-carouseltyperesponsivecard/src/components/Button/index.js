import React from 'react';

import './styles.scss';

function Button({ path, description }) {

  return (
    <button className="Arrow" type="button" aria-controls="carousel" disabled>
        <svg width="16" height="16" viewBox="0 0 16 16" role="presentation">
            <path fillRule="evenodd" d={path}/>
        </svg>
        <span className="Hidden">{description}</span>
    </button>
  );
}

export default Button;
