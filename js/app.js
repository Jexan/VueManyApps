const TicTacVue = new Vue({
    el: '#ticTacVue',

    data: {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        turnSymbol: 'X',
        rowsAndCols: [0,1,2],
        winnerSymbol: null,
        gameFinished: false,
    },

    methods: {
        putPieceAt: function(row, col) {
            if(this.board[row][col] || this.gameFinished) {
                // Perhaps change some text in the page
                return console.log('Error');
            }

            this.board[row][col] = this.turnSymbol;

            if(this.someoneWon()) {
                this.gameFinished = true;
            } else {
                this.changeTurn(); 
            }
        },

        someoneWon: function() {
            // Horizontal
            for (let row in this.board) {
                let firstItem = row[0];

                if (firstItem && 
                    firstItem === row[1] &&
                    firstItem === row[2]) {

                    this.winnerSymbol = firstItem;
                    return true;
                }           
            }

            // Vertical
            for (let colN in this.rowsAndCols) {
                let firstItem = this.board[0][colN];
             
                if (firstItem &&
                    firstItem === this.board[1][colN] && 
                    firstItem === this.board[2][colN]) {

                    this.winnerSymbol = firstItem;
                    return true;
                }
            }

            // Diagonals
            let centerLetter = this.board[1][1];

            if(centerLetter) {
                if((centerLetter === this.board[0][0] && centerLetter === this.board[2][2]) || 
                   (centerLetter === this.board[2][0] && centerLetter === this.board[0][2])) {
                    this.winnerSymbol = centerLetter;
                    return true;
                }
            }

            return false;
        },

        changeTurn: function() {
            this.turnSymbol = (this.turnSymbol === 'X')? 'O' : 'X';
        }
    }
});