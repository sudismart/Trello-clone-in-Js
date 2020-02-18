var cardEdit = {
    node : document.getElementById('card-edit'),
    windowOverlay : document.getElementById('container-overlay'),
    titleNode : document.getElementById('card-edit-title'),
    card : undefined
}

cardEdit.show = function() {
    cardEdit.windowOverlay.style.display = 'block'
    cardEdit.node.style.display = 'block'
}

cardEdit.clearInputs = function() {
    cardEdit.titleNode.value = ''
}

cardEdit.close = function() {
    cardEdit.card = undefined
    cardEdit.clearInputs()
    cardEdit.node.style.display = 'none'
    cardEdit.windowOverlay.style.display = 'none'
}

cardEdit.submit = function(evt) {
    evt.preventDefault()
    var title = cardEdit.titleNode.value.trim()

    if(title) {
        cardEdit.card.title = title
        cardEdit.card.titleNode.replaceChild( document.createTextNode(title),
            cardEdit.card.titleNode.childNodes[0])
    }
    cardEdit.close()
}