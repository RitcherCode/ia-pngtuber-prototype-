// src/bot.js
// Bot de Twitch + reacciones automáticas según mensaje

const tmi = require("tmi.js");
const watcher = require("./watcher");
const config = require("../config.json");

// Diccionarios simples de palabras clave
const happyWords = ["jaja", "xd", "😂", "😊", "jeje", "contento", "feliz"];
const angryWords = ["malo", "enojo", "furia", "cállate", "odio", "😡", "enojado"];
const sadWords   = ["triste", "lloro", "😭", "pena", "solo", "aburrido"];

// Configuración del cliente de Twitch
const client = new tmi.Client({
  identity: {
    username: config.username,
    password: config.oauth,
  },
  channels: config.channels,
});

client.connect();

// Función para analizar el mensaje
function analyzeMessage(message) {
  const msg = message.toLowerCase();

  if (happyWords.some(word => msg.includes(word))) return "happy";
  if (angryWords.some(word => msg.includes(word))) return "angry";
  if (sadWords.some(word => msg.includes(word)))   return "sad";
  return "talking"; // por defecto solo "hablando"
}

// Evento: cuando alguien escribe en el chat
client.on("message", (channel, tags, message, self) => {
  if (self) return;

  console.log(`[${tags.username}]: ${message}`);

  // Analiza el mensaje y cambia la pose
  const mood = analyzeMessage(message);

  switch (mood) {
    case "happy":
      watcher.setHappy();
      break;
    case "angry":
      watcher.setAngry();
      break;
    case "sad":
      watcher.setSad();
      break;
    default:
      watcher.setTalking();
  }

  // Volver a idle después de 3 segundos
  setTimeout(() => watcher.setIdle(), 3000);
});
