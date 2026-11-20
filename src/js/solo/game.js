export const createFoodPosition = (
    snake,
    boardWidth = 600,
    boardHeight = 600,
    cellSize = 30,
    random = Math.random
) => {
    const occupiedPositions = new Set(
        snake.map(({ x, y }) => `${x},${y}`)
    )
    const availablePositions = []

    for (let y = 0; y <= boardHeight - cellSize; y += cellSize) {
        for (let x = 0; x <= boardWidth - cellSize; x += cellSize) {
            if (!occupiedPositions.has(`${x},${y}`)) {
                availablePositions.push({ x, y })
            }
        }
    }

    if (availablePositions.length === 0) return null

    const randomValue = Math.min(Math.max(random(), 0), 1 - Number.EPSILON)
    const index = Math.floor(randomValue * availablePositions.length)

    return availablePositions[index]
}

export const createGameState = ({
    boardWidth = 600,
    boardHeight = 600,
    cellSize = 30,
    initialPosition = { x: 270, y: 300 },
    random = Math.random
} = {}) => {
    const snake = [{ ...initialPosition }]

    return {
        snake,
        food: createFoodPosition(
            snake,
            boardWidth,
            boardHeight,
            cellSize,
            random
        ),
        score: 0,
        speed: 100,
        direction: undefined,
        nextDirection: undefined,
        gameOver: false,
        gameWon: false,
        paused: false
    }
}

export const resetGameState = options => createGameState(options)
