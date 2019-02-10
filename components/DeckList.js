import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { getDecks, saveDeckTitle } from '../utils/api'
import { receiveDecks, addDeck } from '../actions'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import IndividualDeck from './IndividualDeck'
import { purple } from '../utils/colors'
import { Constants } from 'expo'

function AppStatusBar({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

class DeckList extends Component {
	constructor(props, context) {
    	super(props, context);
    	this.state = { ready: false }
    	this._onForward = this._onForward.bind(this);
  	}

	componentDidMount () {
	    const { dispatch } = this.props

	    getDecks()
	      .then((decks) => dispatch(receiveDecks(decks)))
	      .then(() => this.setState(() => ({ready: true})))
    }
    
    _onForward(title, questions){
    	const {navigate} = this.props.navigation;
	    navigate( 'IndividualDeck' ,{title, questions})
    }

	render() {
		const { decks } = this.props
		const { ready } = this.state

	    if (ready === false) {
	      return <AppLoading />
	    }

	    var arr = []
	    for(var key in decks){
	    	arr.push(decks[key])
	    }
	    
		return ( 
			<ScrollView>
				 {arr.map(({questions, title}) => <TouchableOpacity key={{title}} onPress={(e) => this._onForward(title,questions)}>
				 		<ListItem 
							key={title} 
							title={title} 
							card_count={questions.length} 
					  	/>
					  </TouchableOpacity>
				)}
        		 </ScrollView>
        )
	}
}

function mapStateToProps (decks) {
  return {
  	decks
  }
}

export default connect(
  mapStateToProps,
)(DeckList)