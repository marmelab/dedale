import React from 'react';
import wood from './wood.jpg';
import metal from './metal.jpg';

export default ({ width, height }) => {
    return (
        <x3d is="x3d" width={`${width}px`} height={`${height}px`}>
            <scene is="scene">
                <transform translation="0 0 0.1">
                    <shape is="shape">
                        <appearance is="appearance">
                            <imageTexture is="imageTexture" url={metal} />
                        </appearance>
                        <sphere is="sphere" solid radius={0.1}></sphere>
                    </shape>
                </transform>

                <shape is="shape">
                    <appearance is="appearance">
                        <imageTexture scale="false" is="imageTexture" url={wood} />
                    </appearance>
                    <plane is="plane" size={`${width / 100},${height / 100}`}></plane>
                </shape>
            </scene>
        </x3d>
    );
};
