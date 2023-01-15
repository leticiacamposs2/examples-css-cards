import React from 'react';

function Features() {
    return (
        <>
            <h2>Features</h2>
            <ul>
                <li>Progressively enhanced (only previous/next buttons require JavaScript)</li>
                <li>Handles focus state and keyboard navigation</li>
                <li>Uses CSS scroll-snap for transitions and touch control</li>
                <li>Respects reduced motion preference</li>
                <li>Aspect ratios are preferred but max-width overrules</li>
                <li>
                <label>
                <input type="checkbox" id="toggle-rtl" />
                <span>Supports <abbr title="right-to-left">RTL</abbr> styles</span>
                </label>
            </li>
                <li>
                <label>
                <input type="checkbox" id="toggle-single" />
                <span>Single slides</span>
                </label>
            </li>
            </ul>
        </>
    )
}

export default Features;