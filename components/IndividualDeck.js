import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { getDecks, saveDeckTitle } from '../utils/api'
import { receiveDecks, addDeck } from '../actions'
import ListItem from './ListItem'
import { connect } from 'react-redux'
import { blue, purple } from '../utils/colors'
import AddCard from './AddCard'
import Quiz from './Quiz'

function SubmitBtn ({ onPress, text }) {
  return (
    <TouchableOpacity 
      style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
        <Text style={{color: 'white', fontSize: 24}}> {text} </Text>
    </TouchableOpacity>
  )
}


class IndividualDeck extends Component {
	newcard(title) {
    const {navigate} = this.props.navigation
    navigate( 'AddCard',{title})
  }

  quiz(title,questions) {
    const {navigate} = this.props.navigation
    navigate( 'Quiz',{title, questions})
  }

	render() {
		const { title } = this.props.navigation.state.params
    const questions  = this.props.state[title].questions
    return(
      <View>
        <View style={[styles.outerborder,{marginBottom: 60}]}>
          <Text style={[styles.heading,{fontSize: 30}]} > {title} </Text>
          <Text style={[styles.heading,{fontSize: 20}]} > {questions.length} cards </Text>
        </View>
        <View style={[styles.outerborder]}>
          <SubmitBtn text='Add Card' onPress={() => this.newcard(title)} />
          <SubmitBtn text='Start Quiz' onPress={() => this.quiz(title,questions)} />
        </View>
      </View>
    )
    	
	}
}

function mapStateToProps (state) {
  return {
  	state
  }
}

const styles = StyleSheet.create({
  outerborder: {
    marginTop: 10,
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    color: blue,
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
    marginBottom: 50
  },
})

export default connect(mapStateToProps)(IndividualDeck)