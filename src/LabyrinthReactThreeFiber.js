import React from 'react';
import { Canvas, Suspense } from 'react-three-fiber';

import wood from './wood.jpg';
import metal from './metal.jpg';
import Box from './three/Box';
import Plane from './three/Plane';
import Cylinder from './three/Cylinder';
import Sphere from './three/Sphere';

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
        <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Sphere
                x={x / 100 + 0.2 - width / 200}
                y={-y / 100 - 0.2 + height / 200}
                z={0.2}
                radius={0.2}
                texture={metal}
            />
            {maze.map(row =>
                row.map(({ x, y, top, left, bottom, right }) => {
                    return (
                        <>
                            {top && (
                                <Box
                                    key={`${x}-${y}-top`}
                                    x={x + 0.5 - width / 200}
                                    y={-y + height / 200}
                                    width={1}
                                    height={0.1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {bottom && (
                                <Box
                                    key={`${x}-${y}-bottom`}
                                    x={x + 0.5 - width / 200}
                                    y={-y - 1 + height / 200}
                                    width={1}
                                    height={0.1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {left && (
                                <Box
                                    key={`${x}-${y}-left`}
                                    x={x - width / 200}
                                    y={-y - 0.5 + height / 200}
                                    width={0.1}
                                    height={1}
                                    depth={1}
                                    texture={wood}
                                />
                            )}
                            {right && (
                                <Box
                                    key={`${x}-${y}-right`}
                                    x={x + 1 - width / 200}
                                    y={-y - 0.5 + height / 200}
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
            {holes.map(({ x, y }) => {
                return (
                    <Cylinder
                        key={`${x}-${y}`}
                        x={x + 0.5 - width / 200}
                        y={-y - 0.5 + height / 200}
                        radius={0.2}
                        height={0.1}
                        color="black"
                    />
                );
            })}
            <Cylinder
                x={goal.x + 0.5 - width / 200}
                y={-goal.y - 0.5 + height / 200}
                radius={0.2}
                height={0.1}
                color="green"
            />
            <Plane x={0} y={0} width={width / 100} height={height / 100} texture={wood} />
        </Canvas>
    );
};

export default Labyrinth;
