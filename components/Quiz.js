import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { blue } from '../utils/colors'
import { AppLoading } from 'expo'
import TextButton from './TextButton'

function SubmitBtn ({ onPress, text }) {
  return (
    <TouchableOpacity 
      style={Platform.OS === 'ios'? styles.iosSubmitBtn : styles.androidSubmitBtn, 
  		{ backgroundColor: (text === 'Correct'?'green':'red'), marginTop: 30,}}
      onPress={onPress}>
        <Text style={{color: 'white', fontSize: 30}}> {text} </Text>
    </TouchableOpacity>
  )
}

class Quiz extends Component {

	constructor(props) {
    	super(props)
    	const { title, questions } = this.props.navigation.state.params
  		const total_ques = questions.length
  		const current_index = Math.floor(Math.random() * total_ques)
    	this.state = { correct:0, done:1, viewing_ques: true, ques_asked: new Set([current_index]), 
    	title, questions, total_ques, display_result: false, current_index }

    	this.mark_correct=this.mark_correct.bind(this)
    	this.mark_incorrect=this.mark_incorrect.bind(this)
    	this.generate_ques_index=this.generate_ques_index.bind(this)
    	this.toggle_view=this.toggle_view.bind(this)
    	this.generate_ques=this.generate_ques.bind(this)
  	}

  	generate_ques_index() {
  		return Math.floor(Math.random() * this.state.total_ques)
  	}

  	generate_ques() {
  		var { ques_asked, done, total_ques } = this.state

  		//check if we are done with all the questions already
  		if ( done === total_ques ){
  			this.setState(() => ({display_result: true}))
  		}

  		else { 
  			var current_index = this.generate_ques_index()
	  		while(ques_asked.has(current_index)){
				current_index = this.generate_ques_index()
			}
	  		ques_asked.add(current_index)
	  		this.setState(() => ({current_index, ques_asked}))
	  	}
  	}

  	mark_correct() {
  		this.setState(() => ({done: this.state.done+1, correct: this.state.correct+1}))
  		this.generate_ques()
  	}

  	mark_incorrect() {
  		this.setState(() => ({done: this.state.done+1}))
  		this.generate_ques()
  	}

  	toggle_view() {
  		this.setState(() => ({viewing_ques: !this.state.viewing_ques}))
  	}

  	render(){
	const { done, questions, viewing_ques, total_ques, current_index, display_result, correct } = this.state

	if(display_result) {
		const accuracy = (correct/total_ques)*100.0
		return (
			<View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
			<Text style={[styles.heading,{fontSize: 40}]} > Keep it up! </Text>
			<Text style={styles.subheading} > You scored {correct}/{total_ques} questions correctly... </Text>
			<Text style={styles.subheading} > Accuracy : {accuracy.toFixed(2)}  </Text>
			</View>
		)
	}

    return(
      <View>
      	  <Text style={{alignItems: 'flex-start', fontSize: 20}}>{done}/{total_ques}</Text>
          {viewing_ques === true? 
          	<View style={[styles.outerborder]}>
            	<Text style={[styles.heading,{fontSize: 40}]} > {questions[current_index].question} </Text>
            	<TextButton children={'View Answer'} style={[{fontSize: 20}]} onPress={this.toggle_view}/>
        	</View>
          :	<View style={[styles.outerborder]}>
            	<Text style={[styles.heading,{fontSize: 40}]} > {questions[current_index].answer} </Text>
            	<TextButton children={'View Question'} style={[{fontSize: 20}]} onPress={this.toggle_view}/>
        	</View>
          }
        <View style={[styles.outerborder]}>
          <SubmitBtn text='Correct' onPress={this.mark_correct} />
          <SubmitBtn text='Incorrect' onPress={this.mark_incorrect} />
        </View>
      </View>
    )
    	
  	}
}

function mapStateToProps(state) {
	return {
		state
	}
}

const styles = StyleSheet.create({
  outerborder: {
    marginTop: 50,
    alignItems: 'center',
  },
  subheading: {
  	fontSize: 20, 
  	textAlign: 'center', 
  	color: blue
  },
  heading: {
    textAlign: 'center',
    color: 'black',
  },
  iosSubmitBtn: {
    padding: 10,
    borderRadius: 7,
    height: 55,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
  },
  androidSubmitBtn: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 55,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
})

export default connect(mapStateToProps)(Quiz)