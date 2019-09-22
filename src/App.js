import React, { useEffect, useState } from 'react';
import NoSleep from 'nosleep.js';

import Labyrinth from './Labyrinth';

const debug = true;

const App = () => {
    const [started, setStarted] = useState(false);
    const start = () => {
        setStarted(true);
        const noSleep = new NoSleep();
        noSleep.enable();
    };
    const [{ xAcceleration, yAcceleration }, setMotion] = useState({ x: 0, y: 0 });
    const [supported, setSupported] = useState(true);
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

    if (!supported && !debug) {
        return <p>Not supported</p>;
    }

    if (!started) {
        return <button onClick={start}>Start</button>;
    }

    return (
        <>
            <Labyrinth
                xAcceleration={xAcceleration}
                yAcceleration={yAcceleration}
                width={800}
                height={1000}
            />
        </>
    );
};

export default App;
