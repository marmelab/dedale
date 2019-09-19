import React, { useState, useEffect } from 'react';
import generateMaze from 'generate-maze';
import { range, uniqWith } from 'ramda';

const cellSize = 100;
const ballSize = 40;

const boundary = (value, min, max) => {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }

    return value;
};

const getCell = (x, y, maze) => {
    const mazeX = Math.floor(x / cellSize);
    const mazeY = Math.floor(y / cellSize);

    try {
        return maze[mazeY][mazeX];
    } catch (e) {
        return null;
    }
};

const getOverLappingCells = (x, y, maze) => {
    const topLeftCorner = { x, y };
    const topRightCorner = { x: x + ballSize - 1, y };
    const bottomLeftCorner = { x, y: y + ballSize - 1 };
    const bottomRightCorner = { x: x + ballSize - 1, y: y + ballSize - 1 };

    const topLeftCell = getCell(topLeftCorner.x, topLeftCorner.y, maze);
    const topRightCell = getCell(topRightCorner.x, topRightCorner.y, maze);
    const bottomLeftCell = getCell(bottomLeftCorner.x, bottomLeftCorner.y, maze);
    const bottomRightCell = getCell(bottomRightCorner.x, bottomRightCorner.y, maze);

    const cells = uniqWith((a, b) => (a && a.x) === (b && b.x) && (a && a.y) === (b && b.y), [
        topLeftCell,
        topRightCell,
        bottomLeftCell,
        bottomRightCell,
    ]).filter(v => !!v);

    return cells;
};

const getX = (cell, nextX) => {
    const minX = cell.x * cellSize;
    const maxX = minX + cellSize;
    if (nextX + ballSize >= maxX) {
        // move past right border
        if (cell.right) {
            // cannot pass
            return maxX - ballSize;
        }
    }
    if (nextX <= minX) {
        // move past left border
        if (cell.left) {
            // cannot pass
            return minX;
        }
    }
    return nextX;
};

const getY = (cell, nextY) => {
    const minY = cell.y * cellSize;
    const maxY = minY + cellSize;
    if (nextY + ballSize >= maxY) {
        // move past bottom border
        if (cell.bottom) {
            // cannot pass
            return maxY - ballSize;
        }
    }
    if (nextY <= minY) {
        // move past top border
        if (cell.top) {
            // cannot pass
            return minY;
        }
    }
    return nextY;
};

const getPositionFromAcceleration = (
    prevX,
    prevY,
    xAcceleration = 0,
    yAcceleration = 0,
    maxX,
    maxY,
    maze,
) => {
    const nextX = boundary(prevX + xAcceleration, 0, maxX);
    const nextY = boundary(prevY + yAcceleration, 0, maxY);

    const cells = getOverLappingCells(prevX, prevY, maze);

    const cell =
        cells.length === 4
            ? {
                  ...cells[0],
                  right: cells[0].right || cells[1].bottom,
                  bottom: cells[0].bottom || cells[2].left,
                  left: cells[0].left || cells[2].top,
                  top: cells[0].top || cells[3].left,
              }
            : cells[0];

    return {
        x: getX(cell, nextX),
        y: getY(cell, nextY),
    };
};

const getRandomCell = (maze, except) => {
    const randomX = Math.floor(Math.random() * maze[0].length);
    const randomY = Math.floor(Math.random() * maze[0].length);

    if (except.find(({ x, y }) => x === randomX && y === randomY)) {
        return getRandomCell(maze, except);
    }

    return {
        x: randomX,
        y: randomY,
    };
};

const getHoles = (maze, quantity, except) => {
    return range(0, quantity).reduce(acc => [...acc, getRandomCell(maze, [...except, ...acc])], []);
};

const getHoleCoord = hole => {
    const startCellX = hole.x * cellSize;
    const startCellY = hole.y * cellSize;
    return {
        x: startCellX + cellSize / 2,
        y: startCellY + cellSize / 2,
    };
};

const detectCircleCollision = (ball, hole) => {
    const holeCoord = getHoleCoord(hole);
    var dx = ball.x + ballSize / 2 - holeCoord.x;
    var dy = ball.y + ballSize / 2 - holeCoord.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    return distance < ballSize / 2 + (ballSize - 30) / 2;
};

export default ({ xAcceleration, yAcceleration, width, height }) => {
    const [{ x, y }, setCoord] = useState({ x: 0, y: 0 });
    const [maze, setMaze] = useState(generateMaze(width / 100, height / 100));
    const [goal, setGoal] = useState({ x: width / 100 - 1, y: height / 100 - 1 });
    const [holes, setHoles] = useState(
        getHoles(maze, 10, [{ x, y }, { x: width / 100 - 1, y: height / 100 - 1 }]),
    );
    const [level, setLevel] = useState(0);
    const [lost, setLost] = useState(false);

    useEffect(() => {
        setCoord(
            getPositionFromAcceleration(
                x,
                y,
                xAcceleration,
                yAcceleration,
                width - ballSize,
                height - ballSize,
                maze,
            ),
        );
    }, [xAcceleration, yAcceleration]);

    const retry = () => {
        setCoord({ x: 0, y: 0 });
        setMaze(generateMaze(width / 100, height / 100));
        const newGoal = getRandomCell(maze, [{ x: 0, y: 0 }]);
        setGoal(newGoal);
        setHoles(getHoles(maze, 10, [{ x, y }, newGoal]));
        setLevel(0);
        setLost(false);
    };

    useEffect(() => {
        if (detectCircleCollision({ x, y }, goal)) {
            setMaze(generateMaze(width / 100, height / 100));
            const newGoal = getRandomCell(maze, [{ x, y }]);
            setGoal(newGoal);
            setHoles(getHoles(maze, 10, [{ x, y }, newGoal]));
            setLevel(v => v + 1);
        }
    });

    useEffect(() => {
        if (
            holes.find(hole => {
                return detectCircleCollision({ x, y }, hole);
            })
        ) {
            setLost(true);
        }
    });

    if (lost) {
        return (
            <div>
                <p>You lost after {level} level</p>
                <button onClick={retry}>Retry</button>
            </div>
        );
    }

    return (
        <div style={{ width, height, position: 'absolute' }}>
            {maze.map(row =>
                row.map(({ x, y, top, left, bottom, right }) => {
                    return (
                        <div
                            key={`${x}-${y}`}
                            style={{
                                position: 'absolute',
                                top: y * cellSize,
                                left: x * cellSize,
                                width: cellSize,
                                height: cellSize,
                                borderTop: top ? '2px black solid' : 'none',
                                borderLeft: left ? '2px black solid' : 'none',
                                borderBottom: bottom ? '2px black solid' : 'none',
                                borderRight: right ? '2px black solid' : 'none',
                                boxSizing: 'border-box',
                            }}
                        />
                    );
                }),
            )}
            <div
                style={{
                    position: 'relative',
                    width: ballSize,
                    height: ballSize,
                    top: `${y}px`,
                    left: `${x}px`,
                    backgroundColor: 'red',
                    borderRadius: ballSize,
                }}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    width: ballSize + 10,
                    height: ballSize + 10,
                    left: goal.x * cellSize + 25,
                    top: goal.y * cellSize + 25,
                    backgroundColor: 'green',
                    borderRadius: ballSize + 10,
                }}
            ></div>
            {holes.map(hole => {
                return (
                    <div
                        key={`${hole.x}-${hole.y}`}
                        style={{
                            position: 'absolute',
                            width: ballSize + 10,
                            height: ballSize + 10,
                            left: hole.x * cellSize + 25,
                            top: hole.y * cellSize + 25,
                            backgroundColor: 'black',
                            borderRadius: ballSize,
                        }}
                    ></div>
                );
            })}
            <div
                style={{
                    position: 'absolute',
                    right: -120,
                    top: 0,
                }}
            >
                Level: {level}
            </div>
        </div>
    );
};
