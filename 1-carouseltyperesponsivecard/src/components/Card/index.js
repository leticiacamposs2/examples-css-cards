import React from 'react';
import './styles.scss';

function Card({ title, description, image, name, linkHref, width, height, loading, className, classId }) {
    const classNameCard = `Card Card--overlay ${className}`

    return (
        <>
            <article className={classNameCard} id={classId}>
                <div className="Card__media">
                    <img
                        src={image} 
                        className="Card__image" 
                        alt={name} 
                        style={{ 
                            width: {width}, 
                            height: {height}, 
                            loading: {loading} 
                        }} 
                    />
                </div>
                <div className="Card__main">
                    <h2 className="Card__heading">
                        <a className="Card__link" href={linkHref}>{title}</a>
                    </h2>
                    <p>{description}</p>
                </div>              
            </article>
        </>
    )
}

export default Card;