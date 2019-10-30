import React from 'react';

export default ({ x = 0, y = 0, z = 0, radius, texture }) => {
    return (
        <transform is="transform" translation={`${x},${y},${z}`}>
            <shape id="ball" is="shape">
                <appearance is="appearance">
                    <imageTexture is="imageTexture" url={texture} />
                </appearance>
                <sphere is="sphere" lit solid radius={radius}></sphere>
            </shape>
        </transform>
    );
};
