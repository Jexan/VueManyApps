const app_list = {'ttt': 'Tic Tac Toe'};

Vue.component('ttt', {
    template: '#ttt-template',

    data: function() {
        return {
            board: [[null, null, null], [null, null, null], [null, null, null]],
            turnSymbol: 'X',
            rowsAndCols: [0,1,2],
            winnerSymbol: null,
            gameFinished: false, 
            turn: 0,
        }
    },

    methods: {
        putPieceAt: function(row, col) {
            if(this.board[row][col] || this.gameFinished) {
                // Perhaps change some text in the page
                return console.log('Error');
            }

            this.board[row][col] = this.turnSymbol;
            this.turn += 1;

            if(this.turn >= 9) {
                this.gameFinished = true;
                this.winnerSymbol = "No one";
            }

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

        resetGame: function() {
            this.board = [[null, null, null], [null, null, null], [null, null, null]];
            this.turnSymbol = 'X';
            this.winnerSymbol = null;
            this.gameFinished = false;
            this.turn = 0;    
        },

        changeTurn: function() {
            this.turnSymbol = (this.turnSymbol === 'X')? 'O' : 'X';
        }
    }
});

Vue.component('app_list', {
    template: '#app-list-template',
    
    data: function() {
        return {
            app_list: app_list
        }
    },

    methods: {
        change_app: function(app) {
            this.$emit('update:current_view', app);
        }
    }
});

const ManyApps = new Vue({
    el: '#main-app',

    data: {
        current_view: 'app_list',
    },

    methods: {
        back_to_list: function() {
            this.current_view = 'app_list';
        },
    }
});