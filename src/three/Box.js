import React from 'react';

const Box = ({ x, y, z, width, height, depth, texture }) => {
    return (
        <mesh position={[x, y, z]} scale={[1, 1, 1]}>
            <boxBufferGeometry args={[width, height, depth]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    );
};

export default Box;
