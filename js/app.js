const appList = {'ttt': 'Tic Tac Toe', 'todo': "To-Do"};

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

Vue.component('appList', {
    template: '#app-list-template',
    
    data: function() {
        return {
            appList: appList
        }
    },

    methods: {
        changeApp: function(app) {
            this.$emit('update:current-view', app);
        }
    }
});

Vue.component('todo', {
    template: "#todo-template",

    data: function() { 
        const todoId = simpleStorage.get('todoId');

        if (todoId === undefined) {
            todoId = 0;
            simpleStorage.set('Jexan@VueManyApps::todoId', 0);
        }

        return {
            todos: simpleStorage.get('Jexan@VueManyApps::todos') || [],
            newTodo: '',
            todoId: todoId,
        }
    },

    mounted: function() {
        this.$on('saving-pending', () => this.saveTodos());
    },

    methods: {
        selectText: function (complete) {
            return complete ? 'Uncheck' : 'Complete';
        },

        toggleEdit: function (item) {
            item.editing = !item.editing;

            if (!item.editing) 
                this.$emit('saving-pending'); 
        },

        addTodo: function () {
            if (this.newTodo === '') return;

            const todo = {
                text: this.newTodo,
                done: false,
                id: this.todoId,
                editing: false
            }

            this.todoId += 1;
            simpleStorage.set('Jexan@VueManyApps::todoId', this.todoId);

            this.todos.push(todo);
            this.newTodo = '';
        },

        deleteTodo: function (id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        },

        saveTodos: function () {
            simpleStorage.set('Jexan@VueManyApps::todos', this.todos);
        },

        deleteChecked: function () {
            this.todos = this.todos.filter(todo => !todo.done);
        }
    },

    watch: {
        todos: function() {this.saveTodos()},
    },
});

const ManyApps = new Vue({
    el: '#main-app',

    data: {
        currentView: 'appList',
    },

    methods: {
        backToList: function() {
            this.currentView = 'appList';
        },
    }
});