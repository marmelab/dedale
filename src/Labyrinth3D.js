import React, { useEffect } from 'react';
import wood from './wood.jpg';
import metal from './metal.jpg';
import Box from './3d/Box';
import Sphere from './3d/Sphere';
import Plane from './3d/Plane';
import Cylinder from './3d/Cylinder';

export default ({ width, height, xAcceleration, yAcceleration, maze, x, y, go, goal, holes }) => {
    useEffect(() => {
        window.x3dom.reload();
    }, []);
    return (
        <>
            <x3d id="x3d" is="x3d" width={`${width}px`} height={`${height}px`} onClick={go}>
                <scene onClick={go} is="scene">
                    <navigationInfo is="navigationInfo" type='"none"' id="navType"></navigationInfo>
                    <viewpoint
                        is="viewpoint"
                        bind="TRUE"
                        centerOfRotation={`${width / 200},${-height / 200},0`}
                        isActive
                        position={`${width / 200},${-height / 200},13`}
                    ></viewpoint>
                    <directionallight
                        is="directionlight"
                        id="directional"
                        direction="0.5 0.5 -1"
                        on="TRUE"
                        intensity="1.0"
                        shadowintensity="0.4"
                        shadowcascades="1"
                        shadowfiltersize="16"
                        shadowmapsize="512"
                        color="1,1,1"
                        znear="-1"
                        zfar="-1"
                        shadowsplitfactor="1"
                        shadowsplitoffset="0.1"
                    ></directionallight>
                    <transform is="transform" translation="0,0,0">
                        <transform
                            is="transform"
                            rotation={`0 1 0 ${xAcceleration / 100}`}
                            center={`${width / 200},${-height / 200},0`}
                        >
                            <transform
                                is="transform"
                                rotation={`1 0 0 ${yAcceleration / 100}`}
                                center={`${width / 200},${-height / 200},0`}
                            >
                                <group is="group">
                                    <Sphere
                                        x={x / 100 + 0.2}
                                        y={-y / 100 - 0.2}
                                        z={0.2}
                                        radius={0.2}
                                        texture={metal}
                                    />
                                    <group is="group">
                                        {maze.map(row =>
                                            row.map(({ x, y, top, left, bottom, right }) => {
                                                return (
                                                    <>
                                                        {top && (
                                                            <Box
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
                                    </group>
                                    <Plane
                                        x={width / 200}
                                        y={-height / 200}
                                        width={width / 100}
                                        height={height / 100}
                                        texture={wood}
                                    />
                                    <group is="group">
                                        {holes.map(({ x, y }) => {
                                            return (
                                                <Cylinder
                                                    key={`${x}-${y}`}
                                                    x={x + 0.5}
                                                    y={-y - 0.5}
                                                    rotation={`1,0,0,${Math.PI / 2}`}
                                                    radius={0.2}
                                                    height={0.1}
                                                    diffuseColor="0 0 0"
                                                />
                                            );
                                        })}

                                        <Cylinder
                                            x={goal.x + 0.5}
                                            y={-goal.y - 0.5}
                                            rotation={`1,0,0,${Math.PI / 2}`}
                                            radius={0.2}
                                            height={0.1}
                                            diffuseColor="0 1 0"
                                        />
                                    </group>
                                </group>
                            </transform>
                        </transform>
                    </transform>
                </scene>
            </x3d>
        </>
    );
};
