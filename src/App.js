import React, { useEffect, useState } from 'react';
import NoSleep from 'nosleep.js';

import useDedale from './useDedale';
import Labyrinth from './Labyrinth';
import Labyrinth3D from './Labyrinth3D';

const debug = true;

const width = 800;
const height = 1000;

const App = () => {
    useEffect(() => {
        if (debug) {
            return;
        }
        const noSleep = new NoSleep();
        noSleep.enable();
        return () => {
            noSleep.disable();
        };
    }, []);
    const [{ xAcceleration, yAcceleration }, setMotion] = useState({ x: 0, y: 0 });
    const [supported, setSupported] = useState(true);
    const [use3D, setUse3D] = useState(true);

    const toggle3D = () => {
        setUse3D(state => !state);
    };

    useEffect(() => {
        if (!window.DeviceMotionEvent) {
            setSupported(false);
        }
        const handleMotionEvent = event => {
            requestAnimationFrame(() =>
                setMotion({
                    xAcceleration: -event.accelerationIncludingGravity.x * 5,
                    yAcceleration: event.accelerationIncludingGravity.y * 5,
                }),
            );
        };

        window.addEventListener('devicemotion', handleMotionEvent, true);
    }, []);

    if (debug) {
        useEffect(() => {
            document.addEventListener('mousemove', event => {
                requestAnimationFrame(() =>
                    setMotion({
                        xAcceleration: event.movementX,
                        yAcceleration: event.movementY,
                    }),
                );
            });
        }, []);
    }
    const dedaleProps = useDedale({
        width,
        height,
        xAcceleration,
        yAcceleration,
    });

    if (!supported && !debug) {
        return <p>Not supported</p>;
    }

    return (
        <>
            <button onClick={toggle3D}>toggle3d</button>
            {use3D ? (
                <Labyrinth3D
                    width={width}
                    height={height}
                    xAcceleration={xAcceleration}
                    yAcceleration={yAcceleration}
                    {...dedaleProps}
                />
            ) : (
                <Labyrinth {...dedaleProps} width={width} height={height} />
            )}
        </>
    );
};

export default App;
