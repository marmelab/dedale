import React from 'react';

export default ({ x = 0, y = 0, z = 0, width, height, depth, texture }) => {
    return (
        <transform is="transform" translation={`${x},${y},${z}`}>
            <shape is="shape">
                <appearance is="appearance">
                    <imageTexture is="imageTexture" url={texture} />
                </appearance>
                <box is="box" size={`${width},${height},${depth}`}></box>
            </shape>
        </transform>
    );
};
