function addCardTrello (list) {
    return function () {
        var  cardTitle = list.titleFormNode.getElementsByClassName('trello-new-card-title-input')[0]
        var cardSubmitBtn = list.titleFormNode.getElementsByClassName('trello-new-card-title-submit')[0]
        cardSubmitBtn.onclick = saveCardTitle
        list.titleFormNode.style.display = 'block'
        cardTitle.focus()

        function saveCardTitle(evt) {
            evt.preventDefault()
            var title = cardTitle.value.trim(),
                card
            list.titleFormNode.style.display = 'none'
            cardTitle.value = ''
            if (!title){
                return
            }  
            card = new Card (list, title)
            list.board.registerCard(card, list.cards.length)
            list.cardsNode.insertBefore(card.node, list.cards[list.cards.length - 1].node)
            list.cards.push(card)
        }
    }
}