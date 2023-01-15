import React from 'react';

import './Pagination.scss';

function Pagination() {
    return (
        <>
            <nav className="Pagination">
                <h2 className="Hidden">Carousel Navigation</h2>
                <button className="Arrow" type="button" aria-controls="carousel" disabled>
                    <svg width="16" height="16" viewBox="0 0 16 16" role="presentation">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                    <span className="Hidden">Previous slide</span>
                </button>
                <button className="Arrow" type="button" aria-controls="carousel" disabled>
                    <svg width="16" height="16" viewBox="0 0 16 16" role="presentation">
                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                    <span className="Hidden">Next slide</span>
                </button>
                <div className="Dots">
                    <a href="#card-1" className="Dot" tabIndex="-1"><span className="Hidden">Slide 1</span></a>
                    <a href="#card-2" className="Dot" tabIndex="-1"><span className="Hidden">Slide 2</span></a>
                    <a href="#card-3" className="Dot" tabIndex="-1"><span className="Hidden">Slide 3</span></a>
                    <a href="#card-4" className="Dot" tabIndex="-1"><span className="Hidden">Slide 4</span></a>
                    <a href="#card-5" className="Dot" tabIndex="-1"><span className="Hidden">Slide 5</span></a>
                    <a href="#card-6" className="Dot" tabIndex="-1"><span className="Hidden">Slide 6</span></a>
                    <a href="#card-7" className="Dot" tabIndex="-1"><span className="Hidden">Slide 7</span></a>
                    <a href="#card-8" className="Dot" tabIndex="-1"><span className="Hidden">Slide 8</span></a>
                </div>
            </nav>
        </>
    )
}

export default Pagination;