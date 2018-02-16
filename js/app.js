const TicTacVue = new Vue({
    el: '#ticTacVue',

    data: {
        board: [[null, null, null], [null, null, null], [null, null, null]],
        turn: 'X',
    },
});