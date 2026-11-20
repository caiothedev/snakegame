
import { describe, it, expect } from "vitest"
import {
    createGame,
    moveSnake,
    checkCollision,
    eatFood
} from "../../src/js/solo/game.js"

describe("Solo Game", () => {
    describe("createGame", () => {
        it("should create the initial game state", () => {
            const game = createGame()

            expect(game.score).toBe(0)
            expect(game.snake.length).toBeGreaterThan(0)
            expect(game.gameOver).toBe(false)
        })
    })

    describe("moveSnake", () => {
        it("should move the snake to the right", () => {
            const game = createGame()
            const initialPosition = { ...game.snake[0] }

            const updatedGame = moveSnake(game)

            expect(updatedGame.snake[0].x).toBe(initialPosition.x + 1)
            expect(updatedGame.snake[0].y).toBe(initialPosition.y)
        })
    })

    describe("checkCollision", () => {
        it("should detect wall collisions", () => {
            const game = createGame({
                snake: [{ x: -1, y: 5 }]
            })

            expect(checkCollision(game)).toBe(true)
        })
    })

    describe("eatFood", () => {
        it("should increase the score when eating food", () => {
            const game = createGame()

            const updatedGame = eatFood(game)

            expect(updatedGame.score).toBeGreaterThan(game.score)
        })
    })
})
