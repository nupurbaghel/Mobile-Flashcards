import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { blue, gray } from '../utils/colors'

export default function ListItem ({ title, card_count }){
	return (
		<View style={styles.outline}>
			<Text style={styles.heading}>{title}</Text>
			<Text style={styles.subheading}>{card_count} cards</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	outline: {
		backgroundColor: 'white',
		borderRadius: 3,
		borderColor: 'black',
		borderWidth: 0.5,
		paddingTop: 10,
		paddingBottom: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 6,
		marginBottom: 6,
		marginLeft: 6,
		marginRight: 6,
		shadowColor: "#000000",
	    shadowOpacity: 0.8,
	    shadowRadius: 2,
	    shadowOffset: {
	      height: 1,
	      width: 1
	    }
	},
	heading: {
		fontSize: 30,
		color: blue
	},
	subheading: {
		fontSize: 25,
		color: gray
	}
})