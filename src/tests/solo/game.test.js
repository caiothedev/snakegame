import { describe, expect, it, vi } from "vitest"
import {
    createFoodPosition,
    createGameState,
    resetGameState
} from "../../js/solo/game.js"

describe("Solo game", () => {
    describe("createFoodPosition", () => {
        it("returns a free position on the board", () => {
            const snake = [{ x: 0, y: 0 }]
            const position = createFoodPosition(
                snake,
                60,
                60,
                30,
                () => 0
            )

            expect(position).toEqual({ x: 30, y: 0 })
        })

        it("never places food on the snake", () => {
            const snake = [
                { x: 0, y: 0 },
                { x: 30, y: 0 }
            ]
            const position = createFoodPosition(
                snake,
                60,
                60,
                30,
                () => 0.5
            )

            expect(snake).not.toContainEqual(position)
        })

        it("returns null when the board has no free positions", () => {
            const snake = [
                { x: 0, y: 0 },
                { x: 30, y: 0 },
                { x: 0, y: 30 },
                { x: 30, y: 30 }
            ]
            const random = vi.fn()

            const position = createFoodPosition(
                snake,
                60,
                60,
                30,
                random
            )

            expect(position).toBeNull()
            expect(random).not.toHaveBeenCalled()
        })
    })

    describe("createGameState", () => {
        it("creates a complete initial game state", () => {
            const state = createGameState({ random: () => 0 })

            expect(state).toMatchObject({
                snake: [{ x: 270, y: 300 }],
                food: expect.any(Object),
                score: 0,
                speed: 100,
                gameOver: false,
                gameWon: false,
                paused: false
            })
            expect(state.direction).toBeUndefined()
            expect(state.nextDirection).toBeUndefined()
        })
    })

    describe("resetGameState", () => {
        it("restores every gameplay value to its initial state", () => {
            const resetState = resetGameState({ random: () => 0 })

            expect(resetState).toMatchObject({
                snake: [{ x: 270, y: 300 }],
                food: expect.any(Object),
                score: 0,
                speed: 100,
                gameOver: false,
                gameWon: false,
                paused: false
            })
            expect(resetState.direction).toBeUndefined()
            expect(resetState.nextDirection).toBeUndefined()
        })
    })
})