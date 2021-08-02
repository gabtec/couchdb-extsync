const fs = require('fs');

function loadJson (filePath) {
  const file = fs.readFileSync(filePath);
  try {
    return JSON.parse(file);
  } catch (error) {
    throw new Error('[Error:] Invalid JSON syntax.');
  }
}

module.exports = loadJson;