( function (){
    'use strict'
    //Board constructor 
    function Board(title) {
        var nextId = 0
        this.title = title
        this.lists = []
        this.cards = {}
    
        this.node = document.createElement('div')
        this.node.id = 'trello-board'
    
        this.titleNode = document.createElement('h3')
        var titleTextNode = document.createTextNode(this.title)
        this.titleNode.appendChild(titleTextNode)
        this.titleNode.classList.add('trello-board-title')
    
        this.listsNode = document.createElement('div')
        this.listsNode.id = 'trello-list-container'


        this.titleFormNode = buildListTitleForm()

        this.getNextId = function() {
            return '_' + (nextId++).toString()
        } 
    }

    Board.prototype.render = function() {
       this.lists.push(new List(this, 'Add new list..', 0, true))
       for (var i=0; i<this.lists.length; i++) {
            this.listsNode.appendChild(this.lists[i].node)
       }
       this.lists[this.lists.length - 1].node.appendChild(this.titleFormNode)
       this.lists[this.lists.length - 1].titleNode.onclick = addListTrello(this)
       this.node.appendChild(this.titleNode)
       this.node.appendChild(this.listsNode)
    }

    Board.prototype.registerCard = function (card, index) {
        this.cards[card.id] = {
            card : card,
            list : card.list,
            index : index
        }
        console.table(this.cards)
    }

    Board.prototype.reArrangeCards = function (list, index, shift) {
        for (var i = index; i < list.cards.length; ++i) {
            this.registerCard(card, i + shift)
        }
    }

    Board.prototype.unregisterCard = function (card) {
        delete this.cards[card.id]
    }

    document.getElementById('card-edit-close').onclick = cardEdit.close

	document.getElementById('card-edit-submit').onclick = cardEdit.submit

	document.getElementById('card-edit-delete').onclick = cardDeleteTrello.delete

	cardEdit.windowOverlay.onclick = cardEdit.close

    document.body.onload = function() {
        var title = 'First Trello Board',
            board = new Board(title)
        document.getElementById('container').appendChild(board.node)
        
        // Board render first list
        board.render()
        currentBoard = board
    }

})()



