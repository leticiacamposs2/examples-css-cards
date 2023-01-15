import React from 'react';
import Button from '../Button';

import './styles.scss';

function Pagination({ dots }) {
    return (
        <>
            <nav className="Pagination">
                <h2 className="Hidden">Carousel Navigation</h2>
                <Button description="Previous slide" path="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                <Button description="Next slide" path="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                <div className="Dots">
                    {dots && dots.map(dot => (
                        <a key={dot.description} href={dot.linkHref} className="Dot" tabIndex="-1"><span className="Hidden">{dot.description}</span></a>
                    ))}
                </div>
            </nav>
        </>
    )
}

export default Pagination;