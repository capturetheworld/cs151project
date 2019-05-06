
/**
        * Creates a point node
    */
function createPointNode() {
    let x = 0
    let y = 0
    return {
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: 0,
                height: 0
            }
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        }
    }
}