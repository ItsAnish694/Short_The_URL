const characters =
  "0123456789-abcdefghijklmnopqrstuvwxyz_ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function newShortID() {
  let newID = "";
  for (let i = 0; i < 9; i++) {
    newID += characters[randomChar()];
  }
  return newID;
}

function randomChar() {
  return Math.floor(Math.random() * characters.length);
}

export default newShortID;
