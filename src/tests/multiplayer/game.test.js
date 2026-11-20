import { describe, expect, it } from "vitest"
import {
    createPlayer,
    updatePlayerScore,
    createLeaderboard
} from "../../js/multiplayer/game.js"

describe("Multiplayer game", () => {
    describe("createPlayer", () => {
        it("creates a player with the expected initial state", () => {
            const position = { x: 90, y: 120 }
            const player = createPlayer("player-1", "Caio", "#0088EC", position)

            expect(player).toMatchObject({
                id: "player-1",
                name: "Caio",
                color: "#0088EC",
                direction: "right",
                nextDirection: "right",
                snake: [{ x: 90, y: 120 }],
                score: 0,
                alive: true,
                ws: null
            })
            expect(player.snake[0]).not.toBe(position)
        })

        it("uses default color and position when optional values are omitted", () => {
            const player = createPlayer("player-2", "Player")

            expect(player.color).toBe("#CCCCCC")
            expect(player.snake).toEqual([{ x: 0, y: 0 }])
        })

        it("preserves the WebSocket reference", () => {
            const socket = { readyState: 1 }
            const player = createPlayer("player-3", "Player", "#CCCCCC", undefined, socket)

            expect(player.ws).toBe(socket)
        })
    })

    describe("updatePlayerScore", () => {
        it("returns a player with the added score", () => {
            const player = createPlayer("player-1", "Caio")
            const updatedPlayer = updatePlayerScore(player, 10)

            expect(updatedPlayer.score).toBe(10)
            expect(player.score).toBe(0)
        })

        it("supports negative score adjustments", () => {
            const player = { ...createPlayer("player-1", "Caio"), score: 30 }

            expect(updatePlayerScore(player, -10).score).toBe(20)
        })

        it("defaults to adding ten points", () => {
            const player = createPlayer("player-1", "Caio")

            expect(updatePlayerScore(player).score).toBe(10)
        })

        it("rejects invalid players and non-finite points", () => {
            expect(() => updatePlayerScore(null, 10)).toThrow(TypeError)
            expect(() => updatePlayerScore({ score: "0" }, 10)).toThrow(TypeError)
            expect(() => updatePlayerScore(createPlayer("id", "name"), NaN)).toThrow(TypeError)
        })
    })

    describe("createLeaderboard", () => {
        it("sorts players by score in descending order", () => {
            const players = [
                { id: "1", name: "Player 1", score: 10 },
                { id: "2", name: "Player 2", score: 30 },
                { id: "3", name: "Player 3", score: 20 }
            ]

            const leaderboard = createLeaderboard(players)

            expect(leaderboard.map(player => player.score)).toEqual([30, 20, 10])
        })

        it("does not mutate the original players array", () => {
            const players = [
                { id: "1", score: 10 },
                { id: "2", score: 30 }
            ]

            const leaderboard = createLeaderboard(players)

            expect(leaderboard).not.toBe(players)
            expect(players.map(player => player.score)).toEqual([10, 30])
        })

        it("keeps players with equal scores in their original order", () => {
            const players = [
                { id: "first", score: 20 },
                { id: "second", score: 20 },
                { id: "third", score: 10 }
            ]

            expect(createLeaderboard(players).map(player => player.id)).toEqual([
                "first",
                "second",
                "third"
            ])
        })

        it("returns an empty leaderboard for an empty room", () => {
            expect(createLeaderboard([])).toEqual([])
        })

        it("rejects non-array input", () => {
            expect(() => createLeaderboard({})).toThrow(TypeError)
        })
    })
})