import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { blue, gray, purple } from '../utils/colors'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import { ToastAndroid } from 'react-native'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity 
			style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}>
				<Text style={{color: 'white', fontSize: 24}}>SUBMIT</Text>
		</TouchableOpacity>
	)
}

class AddCard extends Component {
	constructor(props) {
    	super(props)
    	this.state = { question: '', answer: ''}
    	this.submit = this.submit.bind(this)
  	}

    clear() {
    	this.setState(() => ({question: '', answer: ''}))
    }

    submit() {
    	const { title } = this.props.navigation.state.params
    	const { question, answer } = this.state

    	const card = { question, answer }
    	if( question === '' || answer === ''){
    		// todo generate alert
    		// Toast.show('Make sure question/answer is not empty!', Toast.LONG)
    		ToastAndroid.show('Make sure question/answer is not empty!', ToastAndroid.LONG);
    	}
    	else {
    		this.props.dispatch(addCard({title, card}))
    		addCardToDeck(title, card)
    		ToastAndroid.show('Card added!', ToastAndroid.SHORT);
    		this.clear()
    		//this.props.navigation.dispatch(NavigationActions.back({key: 'IndividualDeck'}))
    	}
     }

	render() {
		const { ready } = this.state
		if (ready === false) {
	      return <AppLoading />
	    }

		return (
			<View style={styles.outerborder}>
				<TextInput
			        onChangeText={(question) => this.setState({question})}
			        value={this.state.question}
		        	maxLength = {100}
		        	placeholder="Enter the Question..." 
		        	style={[styles.input,{fontSize: 30}]}
		      	/>
				<TextInput
			        onChangeText={(answer) => this.setState({answer})}
			        value={this.state.answer}
		        	maxLength = {100}
		        	placeholder="Enter the Answer..." 
		        	style={[styles.input,{fontSize: 30}]}
		      	/>
		      	<SubmitBtn onPress={this.submit} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	outerborder: {
		alignItems: 'center',
		marginTop: 10,
	},
	input: {
		height: 40,
		padding: 10,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 0,
		borderBottomWidth: 0.5,
		borderBottomColor: 'green',
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 55,
		marginLeft: 40,
		marginRight: 40,
		marginTop: 60
	},
	androidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 55,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 60
	},

})

function mapStateToProps(state) {
	return {
		state
	}
}
export default connect(mapStateToProps)(AddCard)
