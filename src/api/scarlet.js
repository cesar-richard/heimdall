import openSocket from "socket.io-client";
let socket = {};

export function initializeSocket() {
  socket = openSocket("http://localhost:3001");
}

export function subscribeNfc({
  onCard = () => {},
  onOff = () => {},
  onError = () => {},
  onStart = () => {},
  onEnd = () => {}
}) {
  socket.on("card", card => onCard(card));
  socket.on("off", card => onOff(card));
  socket.on("error", err => onError(err));
  socket.on("start", reader => onStart(reader));
  socket.on("end", reader => onEnd(reader));
}
