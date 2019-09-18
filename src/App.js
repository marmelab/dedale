import React, { useEffect, useState } from 'react';
import Labyrinth from './Labyrinth';

const App = () => {
    const [{ xAcceleration, yAcceleration }, setMotion] = useState({ x: 0, y: 0, z: 0 });
    const [supported, setSupported] = useState(true);
    useEffect(() => {
        if (!window.DeviceMotionEvent) {
            setSupported(false);
        }
        const handleMotionEvent = event => {
            setMotion({
                xAcceleration: -event.accelerationIncludingGravity.x * 10,
                yAcceleration: event.accelerationIncludingGravity.y * 10,
            });
        };

        window.addEventListener('devicemotion', handleMotionEvent, true);
    }, []);

    if (!supported) {
        return <p>Not supported</p>;
    }

    return (
        <Labyrinth
            xAcceleration={xAcceleration}
            yAcceleration={yAcceleration}
            width={700}
            height={1000}
        />
    );
};

export default App;
