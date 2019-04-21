
function createCircleNode(color) {
    let x = 0
    let y = 0
    let size = 20
    let color = color
    
    return {
        
        setColor: c => {
            color = c
        },
        getColor: () => {
            return color
        }, 
        clone: () => {
            // Probably totally wrong
            return createCircleNode(color)
        },
        
        draw: () => {
            const canvas = document.getElementById('graphpanel')
            const ctx = canvas.getContext('2d')
            
            ctx.beginPath()
            ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2, true);
            ctx.fillStyle = color
            ctx.fill()           
        },
        
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        
        contains: p => {
            return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
        },
        
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: size,
                height: size
            }
        },
        
        getConnectionPoints: (other_point) => {
            centerX = x + size/2
            centerY = y + size/2
            dx = other_point.getX() - centerX
            dy = other_point.getY() - centerY
            distance = Math.sqrt(dx * dx + dy * dy)
            if (distance == 0){
                return other_point
            } else {
                // should return a new point. not defined yet
                throw "Should return a new point.. but havent finished defining. getConnectionPoints function." 
            }
        },    
    }
}

module.exports = {createCircleNode}
