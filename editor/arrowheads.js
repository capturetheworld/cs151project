/**
        * Places arrowheads on a connection line
        * @arg {int} p - starting point
        * @arg {int} q - ending point
        * @arg {string} arrowType -  the type of arrow None, Triangle, BlackTriangle, Diamond, BlackDiamond, V
        * @return {Path2D} path - 2D path of connections
    */

function arrowHeadGenerator(p, q, arrowType)
{
   let path = new Path2D()
   ARROW_ANGLE = Math.PI / 6
   ARROW_LENGTH = 10;

   let dx = q.x - p.x
   let dy = q.y - p.y
   let angle = Math.atan2(dy, dx)
   let x1 = q.x
      - ARROW_LENGTH * Math.cos(angle + ARROW_ANGLE)
   let y1 = q.y
      - ARROW_LENGTH * Math.sin(angle + ARROW_ANGLE)
   let x2 = q.x
      - ARROW_LENGTH * Math.cos(angle - ARROW_ANGLE)
   let y2 = q.y
      - ARROW_LENGTH * Math.sin(angle - ARROW_ANGLE)

   path.moveTo(q.x, q.y)
   path.lineTo(x1, y1)
   if (arrowType == 'V')
   {
      path.moveTo(x2, y2);
      path.lineTo(q.x, q.y);
   }
   else if (arrowType === 'Triangle' || arrowType === 'BlackTriangle')
   {
      path.lineTo(x2, y2);
      path.closePath();
   }
   else if (arrowType === 'Diamond' || arrowType === 'BlackDiamond')
   {
      let x3 = x2 - ARROW_LENGTH * Math.cos(angle + ARROW_ANGLE);
      let y3 = y2 - ARROW_LENGTH * Math.sin(angle + ARROW_ANGLE);
      path.lineTo(x3, y3);
      path.lineTo(x2, y2);
      path.closePath();
   }
   return path
}
