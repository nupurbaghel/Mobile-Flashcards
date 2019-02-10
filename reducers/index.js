import { RECEIVE_DECKS, ADD_DECK, RECEIVE_CARDS, ADD_CARD } from '../actions'

function reduce (state = {}, action) {
	switch(action.type){
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks,
			}
		case ADD_DECK:
			return {
				...state,
				...{
					...state,
					[action.deck.title]: action.deck,
				}
			}
		case RECEIVE_CARDS:
			return {
				...state,
				...action.cards,
			}
		case ADD_CARD:
			const title = action.card.title
			const new_state = 
				{...state, 
					[title]: { title, questions: state[title].questions.concat([action.card.card])}
				}	 			
			return {
				...state,
				...new_state	
			}
		default:
			return state
	}
}

export default reduce