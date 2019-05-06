/**
        * Does math to find point segment distance 
        * @arg {int} x1 - the x position
        * @arg {int} x2 - second x
        * @arg {int} y1 -  first y
        * @arg {int} y2 - second y
        * @arg {int} px - change x
        * @arg {int} py - change y
        * @return {int} - answer
    */


//ptSegDistSq from Java 8
function ptSegDistSq(x1, y1, x2, y2, px, py) {
  pd2 = (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
  let x = undefined
  let y = undefined
  if (pd2 == 0) {
  // Points are coincident.
    x = x1;
    y = y2;
  }
  else {
    let u = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / pd2;
    if (u < 0) {
      // "Off the end"
      x = x1;
      y = y1;
    }
    else if (u > 1.0) {
      x = x2;
      y = y2;
    }
    else {
      x = x1 + u * (x2 - x1);
      y = y1 + u * (y2 - y1);
    }
  }
  return (x - px) * (x - px) + (y - py) * (y - py);
}
