// src/bot.js
// Bot de Twitch + integración con watcher.js para PNGTuber

const tmi = require("tmi.js");
const watcher = require("./watcher");
const config = require("../config.json");

// Configuración del cliente de Twitch
const client = new tmi.Client({
  identity: {
    username: config.username,
    password: config.oauth,
  },
  channels: config.channels,
});

// Conectar el bot
client.connect();

// Evento: cuando alguien escribe en el chat
client.on("message", (channel, tags, message, self) => {
  if (self) return;

  console.log(`[${tags.username}]: ${message}`);

  // Avatar habla
  watcher.setTalking();

  // Comandos especiales para cambiar de pose
  if (message.toLowerCase().includes("!happy")) watcher.setHappy();
  if (message.toLowerCase().includes("!angry")) watcher.setAngry();
  if (message.toLowerCase().includes("!sad")) watcher.setSad();

  // Volver a idle después de 3 segundos
  setTimeout(() => watcher.setIdle(), 3000);
});
