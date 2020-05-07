export const defaultPresets = [
  {
    "name": "default",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02", "y": "0" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "animation",
    "julia": { "coefficients": "1,0,1", "c": { "x": "0.02+sin(u_time)", "y": "cos(u_time)" }, "maxIterations": "30", "escapeRadius": "10", "useSmoothing": true, "msaa": "1x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
  {
    "name": "polynomial",
    "julia": { "coefficients": "1, 1, 1, 0, 1", "c": { "x": "0.3", "y": "0.03" }, "maxIterations": "90", "escapeRadius": "10", "useSmoothing": true, "msaa": "4x" }, "viewport": { "width": "5", "height": 2.7152852529601725, "translate": { "x": "0", "y": "-0" }, "lockAspectRatio": true }, "color": { "colorPoints": [{ "hex": "#FFFFFF", "position": "0" }, { "hex": "#3ad629", "position": "0.7" }, { "hex": "#faaa05", "position": "1.0" }], "curve": "linear", "colorModel": "RGB" }
  },
]