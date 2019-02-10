import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, StatusBar } from 'react-native'
import { blue, gray, purple } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { Constants } from 'expo'
import { ToastAndroid } from 'react-native'

function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity 
			style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}
			onPress={onPress}>
				<Text style={{color: 'white', fontSize: 24}}>SUBMIT</Text>
		</TouchableOpacity>
	)
}

function emptyDeckObject (title){
	return {
			title,
			questions: [],
	}
}

class AddDeck extends Component {
	constructor(props) {
    	super(props)
    	this.state = { text: '' }
    	this.submit = this.submit.bind(this)
    	this.clear = this.clear.bind(this)
  	}
  	clear(){
  		this.setState(() => ({ text: ''}))
  	}
    submit() {
    	const {text} = this.state
    	if( text === '')
    		ToastAndroid.show('Deck name cannot be blank!', ToastAndroid.LONG)
    	else{
    		this.props.dispatch(addDeck(emptyDeckObject(text)))
    		saveDeckTitle(text)
    		this.clear()
    		ToastAndroid.show('Deck added!', ToastAndroid.SHORT)
    		//this.props.navigation.dispatch(NavigationActions.back({key: 'IndividualDeck'}))
    	}
     }

	render() {
		return (
			<View style={styles.outerborder}>
				<Text style={styles.heading} > What is the title of your deck? </Text>
				<TextInput
			        onChangeText={(text) => this.setState({text})}
			        value={this.state.text}
		        	maxLength = {100}
		        	placeholder="Deck Title" 
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
	},
	heading: {
		textAlign: 'center',
		marginTop: 10,
		fontSize: 30,
		color: blue,
	},
	input: {
		height: 40,
		padding: 10,
		marginTop: 10,
		marginBottom: 60,
		fontSize: 20,
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
		marginBottom: 20
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
		marginBottom: 20
	},

})

function mapStateToProps(state) {
	return {
		state
	}
}
export default connect(mapStateToProps)(AddDeck)
