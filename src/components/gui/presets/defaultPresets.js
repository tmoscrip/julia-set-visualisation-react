const defaultPresets = [
  {
    "name": "init",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02", "y": "0" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "time",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02+sin(u_time)", "y": "cos(u_time)" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "msaa",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02+sin(u_time)", "y": "cos(u_time)" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "4x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "timescale",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02+sin(u_time)", "y": "cos(u_time)" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "4x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "polynomial zoom",
    "julia": { "coefficients": "1,1, 1,0,1", "c": { "x": "0.3", "y": "0.03" }, "maxIterations": "90", "escapeRadius": "10", "useSmoothing": true, "msaa": "4x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "-0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "colour mapping",
    "julia": { "coefficients": "1, 1,0,1", "c": { "x": "0.3", "y": "0.3*sin(u_time)" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "4x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "-0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#000000", "position": "0" }, { "hex": "#1fa2e0", "position": "0.7" }, { "hex": "#0d1eb3", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "hsv",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02", "y": "0" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": 4.906583629893238, "height": "5", "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#000000", "position": "0", "locked": true }, { "hex": "#20df63", "position": "0.5", "locked": false }, { "hex": "#ba4588", "position": "1.0", "locked": true }], "curve": "logarithmic", "colorModel": "HSV" }
  },
  {
    "name": "hsv - rgb",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02", "y": "0" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": 4.906583629893238, "height": "5", "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#000000", "position": "0", "locked": true }, { "hex": "#20df63", "position": "0.5", "locked": false }, { "hex": "#ba4588", "position": "1.0", "locked": true }], "curve": "logarithmic", "colorModel": "RGB" }
  }]