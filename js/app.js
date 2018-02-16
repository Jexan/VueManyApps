const TicTacVue = new Vue({
    el: '#ticTacVue',

    data: {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        turnSymbol: 'X',
        rowsAndCols: [0,1,2]
    },

    methods: {
        putPieceAt: function(row, col) {
            if(this.board[row][col]) {
                // Perhaps change some text in the page
                return console.log('Error');
            }

            this.board[row][col] = this.turnSymbol;

            this.changeTurn(); 
        },

        changeTurn: function() {
            this.turnSymbol = (this.turnSymbol === 'X')? 'O' : 'X';
        }
    }
});