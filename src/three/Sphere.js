import React, { Suspense } from 'react';
import * as THREE from 'three';
import { useLoader } from 'react-three-fiber';

const RawSphere = ({ x, y, z, radius, texture }) => {
    const textureMap = useLoader(THREE.TextureLoader, texture);

    return (
        <mesh position={[x, y, z]} scale={[1, 1, 1]}>
            <sphereBufferGeometry args={[radius]} />
            <meshStandardMaterial map={textureMap} />
        </mesh>
    );
};

export default props => {
    return (
        <Suspense fallback={null}>
            <RawSphere {...props} />
        </Suspense>
    );
};
