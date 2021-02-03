import React from 'react';
import { Canvas, Suspense } from 'react-three-fiber';

import wood from './wood.jpg';
import Box from './three/Box';

const Labyrinth = ({
    width,
    height,
    xAcceleration,
    yAcceleration,
    maze,
    x,
    y,
    go,
    goal,
    holes,
}) => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {maze.map(row =>
                row.map(({ x, y, top, left, bottom, right }) => {
                    return (
                        <>
                            {top && (
                                <Box
                                    key={`${x}-${y}-top`}
                                    x={x + 0.5}
                                    y={-y}
                                    width={1}
                                    height={0.1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {bottom && (
                                <Box
                                    key={`${x}-${y}-bottom`}
                                    x={x + 0.5}
                                    y={-y - 1}
                                    width={1}
                                    height={0.1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {left && (
                                <Box
                                    key={`${x}-${y}-left`}
                                    x={x}
                                    y={-y - 0.5}
                                    width={0.1}
                                    height={1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {right && (
                                <Box
                                    key={`${x}-${y}-right`}
                                    x={x + 1}
                                    y={-y - 0.5}
                                    width={0.1}
                                    height={1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                        </>
                    );
                }),
            )}
        </Canvas>
    );
};

export default Labyrinth;
