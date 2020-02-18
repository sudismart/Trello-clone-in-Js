function addListTrello (board) {
    return function() {
        var titleInput = document.getElementById('trello-list-title-input')
        
        document.getElementById('trello-list-title-submit').onclick = titleButtonSubmit
        board.titleFormNode.style.display  = 'block'
        titleInput.focus()
        
        function titleButtonSubmit(evt) {
            evt.preventDefault()
            console.log(board)
            var title = titleInput.value.trim(),
                index = board.lists.length - 1,
                list
            
            board.titleFormNode.style.display = 'none'
            titleInput.value = ''
            if (!title) return
            list = new List(board, title, index)
            board.lists.splice(index, 0, list)
            board.listsNode.insertBefore(list.node, board.lists[index +1].node)
            board.lists[index + 1].titleNode.setAttribute('list-index', index + 1)
        }

    } 
}