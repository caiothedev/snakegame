import {
    createFoodPosition,
    createGameState,
    resetGameState
} from "./game.js"
import { createGamepadController } from "../gamepad/controller.js"

const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

const score = document.querySelector(".score-value")
const scoreText = document.querySelector(".score-text")
const buttonPlay = document.querySelector(".btn-play")

const size = 30
const maxScore = 3990
const initialPosition = { x: 270, y: 300 }

let gameState = createGameState({
    boardWidth: canvas.width,
    boardHeight: canvas.height,
    cellSize: size,
    initialPosition
})

let snake = gameState.snake
let direction = gameState.direction
let nextDirection = gameState.nextDirection
let speed = gameState.speed
let gameOverState = gameState.gameOver
let gameWinState = gameState.gameWon
let pauseState = gameState.paused
let loopId

const pauseOverlay = document.querySelector(".pause-overlay")

const colorsSnake = {
    default: "#CCCCCC",
    blue: "#0088EC",
    green: "#45D831",
    orange: "#EA6417"
}

let snakeColor = colorsSnake.default

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
}

const randomColor = () => {
    const red = randomNumber(60, 250)
    const green = randomNumber(60, 250)
    const blue = randomNumber(60, 250)
    return `rgb(${red}, ${green}, ${blue})`
}

const food = {
    ...gameState.food,
    color: randomColor()
}

const incrementScore = () => {
    score.innerText = +score.innerText + 10
}

const drawFood = () => {
    if (!food) return

    const { x, y, color } = food
    ctx.shadowColor = color
    ctx.shadowBlur = 6
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0
}

const drawSnake = () => {
    ctx.fillStyle = snakeColor
    snake.forEach(position => {
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (gameOverState || gameWinState) return
    if (nextDirection) direction = nextDirection
    if (!direction) return

    const head = snake[snake.length - 1]
    let newHead

    if (direction === "right") newHead = { x: head.x + size, y: head.y }
    if (direction === "left") newHead = { x: head.x - size, y: head.y }
    if (direction === "down") newHead = { x: head.x, y: head.y + size }
    if (direction === "up") newHead = { x: head.x, y: head.y - size }

    snake.push(newHead)
    snake.shift()
}

const drawGrid = () => {
    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let i = size; i < canvas.width; i += size) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
    }
}

const gameOver = () => {
    direction = undefined
    gameOverState = true
    score.innerText = "PERDEU!"
    scoreText.innerText = "SINTO MUITO"
}

const gameWin = () => {
    direction = undefined
    gameWinState = true
    score.innerText = "VENCEU!"
    scoreText.innerText = "PARABÉNS"
}

const checkEat = () => {
    const head = snake[snake.length - 1]

    if (head.x !== food.x || head.y !== food.y) return

    incrementScore()
    snake.push({ ...head })

    const nextFood = createFoodPosition(
        snake,
        canvas.width,
        canvas.height,
        size
    )

    if (!nextFood) {
        gameWin()
        return
    }

    food.x = nextFood.x
    food.y = nextFood.y
    food.color = randomColor()
}

const checkCollision = () => {
    const head = snake[snake.length - 1]
    const canvasLimitX = canvas.width - size
    const canvasLimitY = canvas.height - size
    const neckIndex = snake.length - 2
    const wallCollision =
        head.x < 0 ||
        head.x > canvasLimitX ||
        head.y < 0 ||
        head.y > canvasLimitY
    const selfCollision = snake.some((position, index) =>
        index < neckIndex &&
        position.x === head.x &&
        position.y === head.y
    )

    if (wallCollision || selfCollision) gameOver()
}

const togglePause = () => {
    if (gameOverState || gameWinState) return

    pauseState = !pauseState

    if (pauseOverlay) {
        pauseOverlay.style.display = pauseState ? "flex" : "none"
    }

    if (pauseState) {
        clearTimeout(loopId)
    } else {
        gameLoop()
    }
}

const gameLoop = () => {
    clearTimeout(loopId)
    if (pauseState || gameOverState || gameWinState) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid()
    drawFood()
    moveSnake()
    drawSnake()
    checkEat()

    if (gameWinState) return

    checkCollision()

    for (let threshold = 200; threshold <= 1000; threshold += 200) {
        if (+score.innerText >= threshold) {
            speed = 100 - threshold / 10
        }
    }

    if (+score.innerText >= maxScore) {
        gameWin()
        return
    }

    loopId = setTimeout(gameLoop, speed)
}

const resetGame = () => {
    clearTimeout(loopId)

    gameState = resetGameState({
        boardWidth: canvas.width,
        boardHeight: canvas.height,
        cellSize: size,
        initialPosition
    })

    snake = gameState.snake
    direction = gameState.direction
    nextDirection = gameState.nextDirection
    speed = gameState.speed
    gameOverState = gameState.gameOver
    gameWinState = gameState.gameWon
    pauseState = gameState.paused

    food.x = gameState.food.x
    food.y = gameState.food.y
    food.color = randomColor()

    if (pauseOverlay) pauseOverlay.style.display = "none"
    score.innerText = "00"
    scoreText.innerText = "SCORE:"

    gameLoop()
}

gameLoop()

document.addEventListener("keydown", ({ key }) => {
    if (key === "Escape") {
        togglePause()
        return
    }

    if (key === "ArrowRight" && direction !== "left") nextDirection = "right"
    if (key === "ArrowLeft" && direction !== "right") nextDirection = "left"
    if (key === "ArrowDown" && direction !== "up") nextDirection = "down"
    if (key === "ArrowUp" && direction !== "down") nextDirection = "up"
})

document.querySelectorAll(".snake-color button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".snake-color button").forEach(btn => {
            btn.classList.remove("active")
        })
        button.classList.add("active")

        snakeColor = colorsSnake[button.id.split("-")[1]]
    })
})

buttonPlay.addEventListener("click", resetGame)

let touchStartX = 0
let touchStartY = 0

canvas.addEventListener("touchstart", event => {
    touchStartX = event.touches[0].clientX
    touchStartY = event.touches[0].clientY
    event.preventDefault()
}, { passive: false })

canvas.addEventListener("touchend", event => {
    const dx = event.changedTouches[0].clientX - touchStartX
    const dy = event.changedTouches[0].clientY - touchStartY
    const absDx = Math.abs(dx)
    const absDy = Math.abs(dy)

    if (Math.max(absDx, absDy) < 10) return

    if (absDx > absDy) {
        if (dx > 0 && direction !== "left") nextDirection = "right"
        if (dx < 0 && direction !== "right") nextDirection = "left"
    } else {
        if (dy > 0 && direction !== "up") nextDirection = "down"
        if (dy < 0 && direction !== "down") nextDirection = "up"
    }

    event.preventDefault()
}, { passive: false })

const dpadMap = {
    "btn-up": () => { if (direction !== "down") nextDirection = "up" },
    "btn-down": () => { if (direction !== "up") nextDirection = "down" },
    "btn-left": () => { if (direction !== "right") nextDirection = "left" },
    "btn-right": () => { if (direction !== "left") nextDirection = "right" }
}

Object.entries(dpadMap).forEach(([id, handler]) => {
    const button = document.getElementById(id)
    if (!button) return

    button.addEventListener("touchstart", event => {
        handler()
        event.preventDefault()
    }, { passive: false })
    button.addEventListener("click", handler)
})

const gamepadStatus = document.getElementById("gamepad-status")

createGamepadController({
    onDirection: value => {
        if (gameOverState || gameWinState || pauseState) return
        const opposite = { up: "down", down: "up", left: "right", right: "left" }
        if (value !== opposite[direction]) nextDirection = value
    },
    onPrimary: () => {
        if (gameOverState || gameWinState) resetGame()
    },
    onPause: togglePause,
    onStatus: message => {
        if (gamepadStatus) gamepadStatus.textContent = message
    }
})