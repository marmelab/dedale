import React from 'react';

const Cylinder = ({ x = 0, y = 0, z = 0, radius, height, color }) => {
    return (
        <mesh position={[x, y, z]} scale={[1, 1, 1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderBufferGeometry args={[radius, radius, height]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};

export default Cylinder;
