/**
        * Creates a generic node
        * @param {int} x - x coord
        * @param {int} y - y coord
        * @param {int} id - identification
    */

function createGenericNode(x, y, id) {
  let x = x
  let y = y
  let id = id
  return {
    getX: () => {
      return x
    },
    getY: () => {
      return y
    },
    getid: () => {
      return id
    },
    setX: newX => {
      x = newX;
    },
    setY: newY => {
      y = newY;
    },
  }
}