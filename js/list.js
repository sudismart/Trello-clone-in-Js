function List (board, title, index, dummyList) {
    this.board = board
    this.title = title
    this.index = index
    this.dummyList = dummyList
    this.node = document.createElement('div')
    this.node.classList.add('trello-list')

    this.titleNode = document.createElement('div')
    this.titleNode.classList.add('trello-list-title')
    this.titleNode.appendChild(document.createTextNode(this.title))
    this.titleNode.setAttribute('list-index', index)
    this.node.appendChild(this.titleNode)

    this.cardsNode = document.createElement('div')

    if (!dummyList) {
        var dummyCrad = new Card (this, 'add new card..')
        this.titleNode.draggable = true
        this.cards = [dummyCrad]
        board.registerCard(this.cards[0], 0)
        this.titleFormNode = buildCardTitleForm()
        for (var i = 0; i < this.cards.length; ++i) {
			this.cardsNode.appendChild(this.cards[i].node)
		}
        dummyCrad.titleNode.onclick = addCardTrello(this)
        this.node.appendChild(this.cardsNode)
        dummyCrad.node.appendChild(this.titleFormNode)
        dummyCrad.node.draggble = false
        dummyCrad.node.onclick = undefined
    }

    this.titleNode.ondragstart = function (evt) {
        var index = parseInt(evt.target.getAttribute('list-index'), 10)
        dragTracker.list = currentBoard.lists[index]
        evt.dataTransfer.effectAllowed = 'move'
    }

    this.titleNode.ondragover = function (evt) {
        if (dragTracker.list) {
            evt.preventDefault()
        }
    }

    this.titleNode.ondrop = function (evt) {
        var sourceIndex =  dragTracker.list.index,
            targetIndex = parseInt(evt.target.getAttribute('list-index'), 10),
            numLists = board.lists.length, 
            i

		if (sourceIndex === targetIndex) { return }

		board.listsNode.removeChild(dragTracker.list.node)
		board.listsNode.insertBefore(dragTracker.list.node,
			board.lists[targetIndex].node)

		for (i = sourceIndex; i < numLists-1; ++i) {
			board.lists[i] = board.lists[i+1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		for (i = numLists-1; i > targetIndex; --i) {
			board.lists[i] = board.lists[i-1]
			board.lists[i].titleNode.setAttribute('list-index', i)
			board.lists[i].index = i
		}
		board.lists[targetIndex] = dragTracker.list
		board.lists[targetIndex].titleNode.setAttribute('list-index', targetIndex)
		board.lists[targetIndex].index = targetIndex
		evt.preventDefault()
    }

    this.titleNode.ondragend = function () {
		dragTracker.list = undefined
	}
}