import React, { useEffect, useState } from 'react';

const App = () => {
    const [{ x, y, z, event }, setMotion] = useState({ x: 0, y: 0, z: 0 });
    const [supported, setSupported] = useState(true);
    useEffect(() => {
        if (!window.DeviceMotionEvent) {
            setSupported(false);
        }
        const handleMotionEvent = event => {
            setMotion({
                x: event.accelerationIncludingGravity.x,
                y: event.accelerationIncludingGravity.y, 
                z: event.accelerationIncludingGravity.z,
                event: JSON.stringify(event),
            });
        }

        window.addEventListener('devicemotion', handleMotionEvent, true);
    }, []);

    if (!supported) {
        return <p>Not supported</p>;
    }

    return (
        <>
            <p>{event}</p>
            <dl><dt>x:</dt><dd>{x}</dd></dl>
            <dl><dt>y:</dt><dd>{y}</dd></dl>
            <dl><dt>z:</dt><dd>{z}</dd></dl>
        </>
    );
}

export default App;