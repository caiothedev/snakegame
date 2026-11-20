const DEADZONE = 0.55
const DIRECTION_BUTTONS = [[12, "up"], [13, "down"], [14, "left"], [15, "right"]]

const isPressed = button => Boolean(button && (button.pressed || button.value > 0.5))

export const getGamepadDirection = (gamepad, deadzone = DEADZONE) => {
    if (!gamepad) return null

    for (const [index, direction] of DIRECTION_BUTTONS) {
        if (isPressed(gamepad.buttons?.[index])) return direction
    }

    const horizontal = gamepad.axes?.[0] ?? 0
    const vertical = gamepad.axes?.[1] ?? 0

    if (Math.abs(horizontal) < deadzone && Math.abs(vertical) < deadzone) return null
    if (Math.abs(horizontal) > Math.abs(vertical)) return horizontal > 0 ? "right" : "left"
    return vertical > 0 ? "down" : "up"
}

export const createGamepadController = ({
    onDirection = () => {},
    onPrimary = () => {},
    onPause = () => {},
    onStatus = () => {}
} = {}) => {
    let frameId = null
    let activeIndex = null
    let lastDirection = null
    let previousPrimary = false
    let previousPause = false
    let lastStatus = ""

    const updateStatus = message => {
        if (message === lastStatus) return
        lastStatus = message
        onStatus(message)
    }

    const getConnectedGamepad = () => {
        if (!navigator.getGamepads) return null
        const gamepads = navigator.getGamepads()

        if (activeIndex !== null && gamepads[activeIndex]?.connected) {
            return gamepads[activeIndex]
        }

        return Array.from(gamepads).find(gamepad => gamepad?.connected) || null
    }

    const poll = () => {
        const gamepad = getConnectedGamepad()

        if (!gamepad) {
            activeIndex = null
            lastDirection = null
            previousPrimary = false
            previousPause = false
            updateStatus("Conecte um controle para jogar")
        } else {
            if (activeIndex !== gamepad.index) {
                activeIndex = gamepad.index
                lastDirection = null
                previousPrimary = false
                previousPause = false
                updateStatus(`Controle conectado: ${gamepad.id}`)
            }

            const direction = getGamepadDirection(gamepad)
            if (direction && direction !== lastDirection) onDirection(direction)
            lastDirection = direction

            const primary = isPressed(gamepad.buttons?.[0])
            const pause = isPressed(gamepad.buttons?.[9])
            if (primary && !previousPrimary) onPrimary()
            if (pause && !previousPause) onPause()
            previousPrimary = primary
            previousPause = pause
        }

        frameId = requestAnimationFrame(poll)
    }

    const handleConnected = event => {
        activeIndex = event.gamepad.index
        lastDirection = null
        previousPrimary = false
        previousPause = false
        updateStatus(`Controle conectado: ${event.gamepad.id}`)
    }

    const handleDisconnected = event => {
        if (event.gamepad.index !== activeIndex) return
        activeIndex = null
        lastDirection = null
        previousPrimary = false
        previousPause = false
        updateStatus("Controle desconectado. Conecte novamente para jogar")
    }

    const start = () => {
        if (frameId !== null) return
        if (!("getGamepads" in navigator)) {
            updateStatus("Este navegador não oferece suporte à Gamepad API")
            return
        }

        window.addEventListener("gamepadconnected", handleConnected)
        window.addEventListener("gamepaddisconnected", handleDisconnected)
        updateStatus("Conecte um controle para jogar")
        frameId = requestAnimationFrame(poll)
    }

    const stop = () => {
        if (frameId !== null) cancelAnimationFrame(frameId)
        frameId = null
        window.removeEventListener("gamepadconnected", handleConnected)
        window.removeEventListener("gamepaddisconnected", handleDisconnected)
    }

    start()
    return { stop }
}