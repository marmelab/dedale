import React, { Suspense } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';

const RawPlane = ({ x, y, z, width, height, texture }) => {
    const textureMap = useLoader(THREE.TextureLoader, texture);
    return (
        <mesh position={[x, y, z]} scale={[1, 1, 1]}>
            <planeBufferGeometry args={[width, height, 1]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    );
};

const Plane = props => {
    return (
        <Suspense fallback={null}>
            <RawPlane {...props} />
        </Suspense>
    );
};

export default Plane;
