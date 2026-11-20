# Gamepad controls - ᴇɴ

The Solo and Multiplayer modes accept browser-recognized controllers through the native [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API). No third-party controller library or driver is bundled.

## Supported controllers

The implementation targets the standard browser mapping and is designed for Xbox One/Series, PlayStation 4 DualShock 4, PlayStation 5 DualSense, and other USB/Bluetooth controllers exposed with a compatible layout. Actual support depends on the operating system, browser, connection method, and mapping exposed by the browser.

## Setup

1. Connect the controller by USB or Bluetooth.
2. Open the game in a modern browser with Gamepad API support. Production deployments should use HTTPS; localhost is suitable for development.
3. Press any controller button if the browser has not activated the device.
4. Read the status message below the game to confirm detection.
5. Steer with the D-pad or left analog stick.

Some browsers expose a controller only after the user presses a button. This is expected behavior.

## Button mapping

| Input | Solo | Multiplayer |
| --- | --- | --- |
| D-pad | Steer | Steer |
| Left analog stick | Steer | Steer |
| A (Xbox) / Cross (PlayStation) | Restart after a win or loss | Join from the name dialog; respawn after elimination |
| Start (Xbox) / Options (PlayStation) | Pause or resume | No action |

The same direction is sent only once until the stick or D-pad returns to neutral. This prevents repeated input messages from flooding the multiplayer WebSocket.

## Troubleshooting

- **Not detected:** reconnect the controller, press a button, and verify that the operating system recognizes it.
- **Bluetooth issues:** test USB and close other applications that may be using the controller.
- **Incorrect buttons:** confirm that the browser exposes the standard mapping. Non-standard layouts can vary by browser and operating system.
- **No status update:** use an up-to-date browser and serve the game over HTTPS or localhost.
- **Multiplayer movement fails:** verify that the WebSocket server is running and that the player has joined the room.

Keyboard and touch controls remain available and are not disabled by gamepad support.