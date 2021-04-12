const createdBoard = (rows, columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return{
                row,
                column,
                opened: false,
                flagged: false,
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    })
}

const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while(minesPlanted < minesAmount) {
        const rowSelected = parseInt(Math.random() * rows, 10)
        const columnSelected = parseInt(Math.random() * columns, 10)
        if(!board[rowSelected][columnSelected].mined){
            board[rowSelected][columnSelected].mined = true
            minesPlanted++
        }
    }
}

const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createdBoard(rows, columns)
    spreadMines(board, minesAmount)
    return board
}

const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field =>{
            return {...field}
        })
    })
}

const getNeighbors = (board, rowSelected, columnSelected) => {
    const neighbors = []
    const rows = [rowSelected - 1, rowSelected, rowSelected + 1]
    const columns = [columnSelected - 1, columnSelected, columnSelected + 1]
    rows.forEach(row => {
        columns.forEach(column => {
            const different = row !== rowSelected || column !== columnSelected
            const validRow = row >= 0 && row < board.length
            const columnValid = column >= 0 && column < board[0].length
            if(different && validRow && columnValid){
                neighbors.push(board[row][column])
            }
        })
    })
    return neighbors
}

const safeNeighborshood = (board, row, column) => {
    const safes = (result, neighbors) => result && !neighbors.mined
    return getNeighbors(board, row, column).reduce(safes, true)
}

const openField = (board, row, column) => {
    const field = board[row][column]
    if(!field.opened){
        field.opened = true
        if(field.mined){
            field.exploded = true
        }else if(safeNeighborshood(board, row, column)){
            getNeighbors(board, row, column)
            .forEach(n => openField(board, n.row, n.column))
        }else{
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(neighbors => neighbors.mined).length
        }
    }
}

const fields = board => [].concat(...board)
const hadExplosion = board => fields(board).filter(field => field.exploded).length > 0
const pedding = field => (field.mined && !field.flagged) || (!field.mined && !field.opened)
const wonGame = board => fields(board).filter(pedding).length === 0
const showMines = board => fields(board).filter(field => field.mined).forEach(field => field.opened = true)

const invertFlag = (board, row, column) => {
    const field = board[row][column]
    field.flagged = !field.flagged
}

const flagsUsed = board => fields(board).filter(field => field.flagged).length

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
}

