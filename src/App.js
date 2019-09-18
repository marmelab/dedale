import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import Labyrinth from './Labyrinth';

const debug = false;

const App = () => {
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

    if (!supported) {
        return <p>Not supported</p>;
    }

    return (
        <>
            <Labyrinth
                xAcceleration={xAcceleration}
                yAcceleration={yAcceleration}
                width={800}
                height={1000}
            />
            {debug && (
                <div
                    style={{
                        zIndex: 1000,
                        position: 'absolute',
                        rigth: 0,
                    }}
                >
                    <button
                        onClick={() => {
                            setMotion({
                                xAcceleration: 0,
                                yAcceleration: -40,
                            });
                            setTimeout(() => setMotion({ xAcceleration: 0, yAcceleration: 0 }), 10);
                        }}
                    >
                        Move up
                    </button>
                    <button
                        onClick={() => {
                            setMotion({
                                xAcceleration: 0,
                                yAcceleration: 40,
                            });
                            setTimeout(() => setMotion({ xAcceleration: 0, yAcceleration: 0 }), 10);
                        }}
                    >
                        Move down
                    </button>
                    <button
                        onClick={() => {
                            setMotion({
                                xAcceleration: -40,
                                yAcceleration: 0,
                            });
                            setTimeout(() => setMotion({ xAcceleration: 0, yAcceleration: 0 }), 10);
                        }}
                    >
                        Move left
                    </button>
                    <button
                        onClick={() => {
                            setMotion({
                                xAcceleration: 40,
                                yAcceleration: 0,
                            });
                            setTimeout(() => setMotion({ xAcceleration: 0, yAcceleration: 0 }), 10);
                        }}
                    >
                        Move right
                    </button>
                </div>
            )}
        </>
    );
};

export default App;
