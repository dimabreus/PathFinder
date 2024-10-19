function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const directions = {
    left: 'Left',
    right: 'Right',
    down: 'Down',
    up: 'Up'
}

const blocks = {
    empty: '.',
    wall: 'W'
}

async function pathFinder(maze) {
    maze = maze.split('\n').map(el => el.split(''));

    let curPos = {
        x: 0,
        y: 0
    };

    let currentDirection = directions.right;
    let steps = 0; // Only for debug.
    const bounds = {
        x: maze[1].length - 1,
        y: maze.length - 1
    }

    while (true) {
        const debugMaze = maze.map(x => x.map(y => y));  // Safe copy
        debugMaze[curPos.y][curPos.x] = 'P';

        if (curPos.x === bounds.x && curPos.y === bounds.y) {
            console.log(debugMaze.map(el => `[${el.join(', ')}]`).join('\n'));
            console.log('Finished!');
            break;
        }


        const yOffset = curPos.y + (
            currentDirection === directions.up ? -1 :
                currentDirection === directions.down ? 1 :
                    0
        )

        const xOffset = curPos.x + (
            currentDirection === directions.left ? -1 :
                currentDirection === directions.right ? 1 :
                    0
        )

        if (!debugMaze[yOffset]) {
            debugMaze[yOffset] = new Array(bounds.x + 1).fill('-');
        }

        debugMaze[yOffset][xOffset] = 'X'

        console.log(`Шагов: ${steps}.`);
        console.log(`Иду на ${currentDirection}`)
        console.log(debugMaze.map(el => `[${el.join(', ')}]`).join('\n'));
        console.log('\n')

        switch (currentDirection) {
            case directions.right:
                if (curPos.x + 1 > bounds.x) {  // Cannot move right, because there a border, going down
                    currentDirection = directions.down;
                } else if (maze[curPos.y][curPos.x + 1] === blocks.wall) {  // Cannot move right, going down
                    currentDirection = directions.down;
                } else {
                    curPos.x++;
                }
                break;
            case directions.down:
                if (curPos.y + 1 > bounds.y) {  // Cannot move down, because there a border, going left
                    currentDirection = directions.left;
                } else if (maze[curPos.y + 1][curPos.x] === blocks.wall) {  // Cannot move down, going left
                    currentDirection = directions.left;
                } else {
                    curPos.y++;
                    currentDirection = directions.right;  // Trying again move right;
                }
                break;
            case directions.left:
                if (curPos.x - 1 < 0) {  // Cannot move left, because there a border, going up
                    currentDirection = directions.up;
                } else if (maze[curPos.y][curPos.x - 1] === blocks.wall) {  // Cannot move left, going up
                    currentDirection = directions.up;
                } else {
                    curPos.x--;
                }
                break;
            case directions.up:
                if (curPos.y - 1 < 0) {  // Cannot move up, because there a border, going right
                    currentDirection = directions.right;
                } else if (maze[curPos.y - 1][curPos.x] === blocks.wall) {  // Cannot move up, going right
                    currentDirection = directions.right;
                } else {
                    curPos.y--;
                }
        }

        steps++;

        await sleep(1000);
    }
    return true;
}

// console.log(
pathFinder(`\
..W
..W
..W\
`)
// )