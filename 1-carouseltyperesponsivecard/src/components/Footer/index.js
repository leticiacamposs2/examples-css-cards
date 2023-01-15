import React from 'react';

function Footer({ linkHrefLicense, linkHrefBootstrap, target }) {
    return (
        <>
            <footer>
                <p><small>MIT licensed | Copyright © 2021 <a href={linkHrefLicense} target={target}>David Bushell</a>
                <br/>SVG from <a href={linkHrefBootstrap} target={target}>Bootstrap Icons</a></small></p>
            </footer>
        </>
    )
}

export default Footer;