import React from 'react';
import wood from './wood.jpg';
import metal from './metal.jpg';
import useDedale from './useDedale';

const degToRad = deg => deg * (Math.PI / 180);

export default ({ width, height, xAcceleration, yAcceleration }) => {
    const { maze, x, y, go, retry, goal, holes, level, lost, safe } = useDedale({
        width,
        height,
        xAcceleration,
        yAcceleration,
    });
    return (
        <>
            {lost ? (
                <>
                    <p>You lose after {level} level</p>
                    <button onClick={retry}>Retry</button>
                </>
            ) : (
                <p>Level: {level}</p>
            )}
            {safe && <button onClick={go}>GO</button>}
            <x3d is="x3d" width={`${width}px`} height={`${height}px`} onClick={go}>
                <scene onClick={go} is="scene">
                    <viewpoint
                        is="viewpoint"
                        bind="true"
                        centerOfRotation={`${width / 200},${-height / 200},0`}
                        fieldOfView="0.785398"
                        isActive
                        orientation="0,0,1,0"
                        position={`${width / 200},${-height / 200},20`}
                        zFar="-1"
                        zNear="-1"
                    ></viewpoint>
                    <navigationInfo is="navigationInfo" type="none" id="navType"></navigationInfo>
                    <group is="group">
                        <transform
                            is="transform"
                            translation={`${x / 100 + 0.2} ${-y / 100 - 0.2} 0.2`}
                        >
                            <shape id="ball" is="shape">
                                <appearance is="appearance">
                                    <imageTexture is="imageTexture" url={metal} />
                                </appearance>
                                <sphere is="sphere" solid radius={0.2}></sphere>
                            </shape>
                        </transform>
                        <group>
                            {maze.map(row =>
                                row.map(({ x, y, top, left, bottom, right }) => {
                                    return (
                                        <>
                                            {top && (
                                                <transform
                                                    key={`top-${x}-${y}`}
                                                    is="transform"
                                                    translation={`${x + 0.5} ${-y}`}
                                                >
                                                    <shape is="shape">
                                                        <appearance is="appearance">
                                                            <imageTexture
                                                                scale="false"
                                                                is="imageTexture"
                                                                url={wood}
                                                            />
                                                        </appearance>
                                                        <box is="box" size="1,0.1,1"></box>
                                                    </shape>
                                                </transform>
                                            )}
                                            {bottom && (
                                                <transform
                                                    key={`bottom-${x}-${y}`}
                                                    is="transform"
                                                    translation={`${x + 0.5} ${-y - 1}`}
                                                >
                                                    <shape is="shape">
                                                        <appearance is="appearance">
                                                            <imageTexture
                                                                scale="false"
                                                                is="imageTexture"
                                                                url={wood}
                                                            />
                                                        </appearance>
                                                        <box is="box" size="1,0.1,1"></box>
                                                    </shape>
                                                </transform>
                                            )}
                                            {left && (
                                                <transform
                                                    key={`left-${x}-${y}`}
                                                    is="transform"
                                                    translation={`${x} ${-y - 0.5}`}
                                                >
                                                    <shape is="shape">
                                                        <appearance is="appearance">
                                                            <imageTexture
                                                                scale="false"
                                                                is="imageTexture"
                                                                url={wood}
                                                            />
                                                        </appearance>
                                                        <box is="box" size="0.1,1,1"></box>
                                                    </shape>
                                                </transform>
                                            )}
                                            {right && (
                                                <transform
                                                    key={`right-${x}-${y}`}
                                                    is="transform"
                                                    translation={`${x + 1} ${-y - 0.5}`}
                                                >
                                                    <shape is="shape">
                                                        <appearance is="appearance">
                                                            <imageTexture
                                                                scale="false"
                                                                is="imageTexture"
                                                                url={wood}
                                                            />
                                                        </appearance>
                                                        <box is="box" size="0.1,1,1"></box>
                                                    </shape>
                                                </transform>
                                            )}
                                        </>
                                    );
                                }),
                            )}
                        </group>

                        <transform is="transform" translation={`${width / 200},${-height / 200},0`}>
                            <shape is="shape" id="ground">
                                <appearance is="appearance">
                                    <imageTexture scale="false" is="imageTexture" url={wood} />
                                </appearance>
                                <plane is="plane" size={`${width / 100},${height / 100}`}></plane>
                            </shape>
                        </transform>
                        <group>
                            {holes.map(({ x, y }) => {
                                return (
                                    <transform
                                        key={`${x}-${y}`}
                                        is="transform"
                                        translation={`${x + 0.5},${-y - 0.5},0`}
                                        rotation="1,0,0,1.7"
                                    >
                                        <shape is="shape">
                                            <appearance is="appearance">
                                                <material
                                                    is="material"
                                                    diffuseColor="0 0 0"
                                                ></material>
                                            </appearance>
                                            <cylinder
                                                is="cylinder"
                                                radius="0.2"
                                                solid
                                                height="0.1"
                                            />
                                        </shape>
                                    </transform>
                                );
                            })}

                            <transform
                                is="transform"
                                translation={`${goal.x + 0.5},${-goal.y - 0.5},0`}
                                rotation="1,0,0,1.7"
                            >
                                <shape is="shape">
                                    <appearance is="appearance">
                                        <material is="material" diffuseColor="0 1 0"></material>
                                    </appearance>
                                    <cylinder is="cylinder" radius="0.2" solid height="0.1" />
                                </shape>
                            </transform>
                        </group>
                    </group>
                </scene>
            </x3d>
        </>
    );
};
