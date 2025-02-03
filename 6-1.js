class MapCellTypes {

}

class MapCell {
    constructor(x, y, type) {
        this.x = x
        this.y = y
        this.type = type
        this.visitedByPlayer = false
    }
}
