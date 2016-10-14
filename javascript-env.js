const path = require("path")

module.exports = {
  lint: {
    files: path.join(__dirname, "src/**/*.js")
  },
  test: {
    files: path.join(__dirname, "/test/**/*.test.js")
  }
}
