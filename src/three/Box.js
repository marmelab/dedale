import React, { Suspense } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';

const RawBox = ({ x, y, z, width, height, depth, texture }) => {
    const textureMap = useLoader(THREE.TextureLoader, texture);
    return (
        <mesh position={[x, y, z]} scale={[1, 1, 1]} castShadow>
            <boxBufferGeometry args={[width, height, depth]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    );
};

const Box = props => {
    return (
        <Suspense fallback={null}>
            <RawBox {...props} />
        </Suspense>
    );
};

export default Box;
