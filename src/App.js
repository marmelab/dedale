import React, { useEffect, useState } from 'react';
import NoSleep from 'nosleep.js';

import useDedale from './useDedale';
import Labyrinth from './Labyrinth';
import Labyrinth3D from './Labyrinth3D';
import LabyrinthThree from './LabyrinthReactThreeFiber';

const debug = false;

const width = 800;
const height = 1000;

const modes = [
    { value: 'react-three-fiber', label: 'use react-three-fiber' },
    { value: 'x3dom', label: 'use x3dom' },
    { value: '2D', label: 'simple dom' },
];

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
    const [mode, setMode] = useState('react-three-fiber');

    const changeMode = event => {
        setMode(event.target.value);
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

        return () => window.removeEventListener('devicemotion', handleMotionEvent);
    }, []);

    if (debug) {
        useEffect(() => {
            const handleMouseMove = event => {
                requestAnimationFrame(() =>
                    setMotion({
                        xAcceleration: event.movementX,
                        yAcceleration: event.movementY,
                    }),
                );
            };

            document.addEventListener('mousemove', handleMouseMove);

            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, []);
    }
    const { safe, go, level, lost, retry, ...dedaleProps } = useDedale({
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
            <div>
                <label>Switch render mode</label>
                <select value={mode} onChange={changeMode}>
                    {modes.map(({ label, value }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
            <div onClick={dedaleProps.go} style={{ width, height, position: 'absolute' }}>
                {lost && (
                    <>
                        <p>You lose after {level} level</p>
                        <button onClick={retry}>Retry</button>
                    </>
                )}
                {safe && <button onClick={go}>GO</button>}
                {mode === 'x3dom' && (
                    <Labyrinth3D
                        width={width}
                        height={height}
                        xAcceleration={safe || lost ? 0 : xAcceleration}
                        yAcceleration={safe || lost ? 0 : yAcceleration}
                        {...dedaleProps}
                    />
                )}
                {mode === '2D' && <Labyrinth {...dedaleProps} width={width} height={height} />}
                {mode === 'react-three-fiber' && (
                    <LabyrinthThree {...dedaleProps} width={width} height={height} />
                )}
                <div
                    style={{
                        position: 'absolute',
                        right: -120,
                        top: 0,
                    }}
                >
                    Level: {level}
                </div>
                {safe && (
                    <button
                        style={{
                            width: 200,
                            height: 200,
                            zIndex: 100000,
                            position: 'absolute',
                            top: height / 2 - 100,
                            left: width / 2 - 100,
                        }}
                        onClick={go}
                    >
                        Tap to start
                    </button>
                )}
            </div>
        </>
    );
};

export default App;
