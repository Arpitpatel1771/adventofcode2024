const MapCellTypes = {
    empty: 1,
    obstacle: 2,
}

class MapCell {
    constructor(type) {
        this.type = type
        this.visitedByPlayer = false
    }
}

class Map {
    constructor(stringInput) {
        this.map = []

        stringInput.split("\n").forEach(row => {
            const cells = []
            row.split("").forEach(cell => {
                let type = undefined
                if (cell == ".") {
                    type = MapCellTypes.empty
                } else if (cell == "#") {
                    type = MapCellTypes.obstacle
                } else if (["^", ">", "<", "V"].includes(cell)) {
                    type = MapCellTypes.empty
                } else {
                    throw new Error("wtf")
                }
                const mapCell = new MapCell(MapCellTypes.empty)
                cell.push(mapCell)
            })
        })

    }
}

