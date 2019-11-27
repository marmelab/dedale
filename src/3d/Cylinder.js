import React from 'react';

export default ({ x = 0, y = 0, z = 0, rotation,  radius, height, diffuseColor }) => {
    return (
        <transform is="transform" translation={`${x},${y},${z}`} rotation={rotation}>
            <shape is="shape">
                <appearance is="appearance">
                    <material is="material" diffuseColor={diffuseColor}></material>
                </appearance>
                <cylinder is="cylinder" radius={radius} solid height={height} lit />
            </shape>
        </transform>
    );
};
