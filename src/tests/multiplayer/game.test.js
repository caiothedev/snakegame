
import { describe, it, expect } from "vitest"
import {
    createPlayer,
    updatePlayerScore,
    createLeaderboard
} from "../../src/js/multiplayer/game.js"

describe("Multiplayer Game", () => {
    describe("createPlayer", () => {
        it("should create a player with an initial score", () => {
            const player = createPlayer("player-1", "Caio")

            expect(player.id).toBe("player-1")
            expect(player.name).toBe("Caio")
            expect(player.score).toBe(0)
        })
    })

    describe("updatePlayerScore", () => {
        it("should update the player's score", () => {
            const player = createPlayer("player-1", "Caio")

            const updatedPlayer = updatePlayerScore(player, 10)

            expect(updatedPlayer.score).toBe(10)
        })
    })

    describe("createLeaderboard", () => {
        it("should sort players by score", () => {
            const players = [
                { id: "1", name: "Player 1", score: 10 },
                { id: "2", name: "Player 2", score: 30 },
                { id: "3", name: "Player 3", score: 20 }
            ]

            const leaderboard = createLeaderboard(players)

            expect(leaderboard.map(player => player.score)).toEqual([
                30,
                20,
                10
            ])
        })
    })
})
