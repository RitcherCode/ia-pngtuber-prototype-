// src/watcher.js
// Controlador para cambiar entre poses en Veadotube Mini

const fs = require("fs");
const path = require("path");

// Carpeta de assets
const assetsDir = path.join(__dirname, "../assets");

// Archivo "current.png" que Veadotube Mini usará como fuente
const outputPath = path.join(assetsDir, "current.png");

// Función genérica para cambiar a una pose
function setPose(pose) {
  const posePath = path.join(assetsDir, `${pose}.png`);
  if (fs.existsSync(posePath)) {
    fs.copyFileSync(posePath, outputPath);
    console.log(`[Watcher] Avatar cambiado a: ${pose}`);
  } else {
    console.error(`[Watcher] Pose ${pose}.png no encontrada en assets.`);
  }
}

// Exportamos las funciones
module.exports = {
  setIdle: () => setPose("idle"),
  setTalking: () => setPose("talking"),
  setHappy: () => setPose("happy"),
  setAngry: () => setPose("angry"),
  setSad: () => setPose("sad"),
};
