export const FLASHCARD_STORAGE_KEY = 'Mobile_Flashcard_App'
import { AsyncStorage } from 'react-native'

export function getDecks() {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
		.then((results) => {
			if (results === null){
		        data = {'Sample_Deck': {
				            	'title': 'Sample_Deck',
				            	'questions': [],
				        	},
		        	   }
		        AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
		        return ( data )
		    }
		    return JSON.parse(results)
		})
}

export function getDeck({id}) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
		.then((results) => {
			data = JSON.parse(results)
			return data[id]
		})
}

export function saveDeckTitle(title) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
		.then((results) => {
			console.log(title)
			data = JSON.parse(results)
			data[title] = {
				title,
				questions: []
			}
			AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
		})
}

export function addCardToDeck(title, card) {
	return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
		.then((results) => {
			data = JSON.parse(results)
			data[title]['questions'].push(card)
			AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(data))
		})
}