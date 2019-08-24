import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3001");
export function subscribeNfc({
  onDetected = () => {},
  onOff = () => {},
  onError = () => {},
  onEnd = () => {}
}) {
  socket.on("card", card => onDetected(null, card));
  socket.on("off", onOff => onOff(null, card));
  socket.on("error", err => onError(null, err));
  socket.on("end", err => onEnd(null, {}));
}
