import { describe, expect, it } from "vitest"
import { getGamepadDirection } from "../js/gamepad/controller.js"

const createGamepad = ({ buttons = [], axes = [0, 0] } = {}) => ({
    buttons: Array.from({ length: 16 }, (_, index) => buttons[index] || { pressed: false, value: 0 }),
    axes
})

describe("Gamepad controls", () => {
    it("maps D-pad buttons to directions", () => {
        expect(getGamepadDirection(createGamepad({ buttons: { 12: { pressed: true } } }))).toBe("up")
        expect(getGamepadDirection(createGamepad({ buttons: { 13: { pressed: true } } }))).toBe("down")
        expect(getGamepadDirection(createGamepad({ buttons: { 14: { pressed: true } } }))).toBe("left")
        expect(getGamepadDirection(createGamepad({ buttons: { 15: { pressed: true } } }))).toBe("right")
    })

    it("maps the left analog stick and applies a deadzone", () => {
        expect(getGamepadDirection(createGamepad({ axes: [-0.9, 0] }))).toBe("left")
        expect(getGamepadDirection(createGamepad({ axes: [0.9, 0] }))).toBe("right")
        expect(getGamepadDirection(createGamepad({ axes: [0, -0.9] }))).toBe("up")
        expect(getGamepadDirection(createGamepad({ axes: [0, 0.9] }))).toBe("down")
        expect(getGamepadDirection(createGamepad({ axes: [0.2, 0.2] }))).toBeNull()
    })

    it("prioritizes the D-pad over the analog stick", () => {
        const gamepad = createGamepad({ buttons: { 12: { pressed: true } }, axes: [0.9, 0] })
        expect(getGamepadDirection(gamepad)).toBe("up")
    })

    it("returns null when no gamepad is supplied", () => {
        expect(getGamepadDirection(null)).toBeNull()
    })
})