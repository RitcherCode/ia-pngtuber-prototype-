const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../assets");
const outputPath = path.join(assetsDir, "current.png");

function setPose(pose) {
  const posePath = path.join(assetsDir, `${pose}.png`);
  if (fs.existsSync(posePath)) {
    fs.copyFileSync(posePath, outputPath);
    console.log(`[Watcher] Avatar cambiado a: ${pose}`);
  } else {
    console.error(`[Watcher] Pose ${pose}.png no encontrada en assets.`);
  }
}

module.exports = {
  setIdle:   () => setPose("idle"),
  setTalking:() => setPose("talking"),
  setHappy:  () => setPose("happy"),
  setAngry:  () => setPose("angry"),
  setSad:    () => setPose("sad"),
};
