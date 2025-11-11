function Person() {
  this.name = "John Doe";
  this.age = 30;
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}

module.exports = { Person, generateRandomNumber };
