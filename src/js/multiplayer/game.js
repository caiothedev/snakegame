export const createPlayer = (
    id,
    name,
    color = "#CCCCCC",
    position = { x: 0, y: 0 },
    ws = null
) => ({
    id,
    name,
    color,
    direction: "right",
    nextDirection: "right",
    snake: [{ ...position }],
    score: 0,
    alive: true,
    ws
})

export const updatePlayerScore = (player, points = 10) => {
    if (!player || !Number.isFinite(player.score)) {
        throw new TypeError("A valid player with a numeric score is required")
    }

    if (!Number.isFinite(points)) {
        throw new TypeError("Score points must be a finite number")
    }

    return {
        ...player,
        score: player.score + points
    }
}

export const createLeaderboard = players => {
    if (!Array.isArray(players)) {
        throw new TypeError("Players must be an array")
    }

    return [...players].sort((first, second) => {
        const scoreDifference = (Number(second.score) || 0) - (Number(first.score) || 0)
        return scoreDifference
    })
}