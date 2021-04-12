import React from 'react'
import {View, StyleSheet} from 'react-native'

export default props => {

    return(
        <View style={styles.container}>
            <View style={props.bigger ? styles.flagpoleBigger : styles.flagpole}/>
            <View style={props.bigger ? styles.flagBigger : styles.flag}/>
            <View style={props.bigger ? styles.base1Bigger : styles.base1}/>
            <View style={props.bigger ? styles.base2Bigger : styles.base2}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 2,
    },
    flagpole: {
        position: 'absolute',
        height: 14,
        width: 2,
        backgroundColor:'#222',
        marginLeft: 9,
    },
    flag: {
        position: 'absolute',
        height: 6,
        width: 5,
        backgroundColor: '#F22',
        marginLeft:3,
    },
    base1: {
        position: 'absolute',
        height: 2,
        width: 6,
        backgroundColor: '#222',
        marginLeft: 7,
        marginTop: 10
    },
    base2:{
        position: 'absolute',
        height: 2,
        width: 10,
        backgroundColor: '#222',
        marginLeft: 5,
        marginTop: 12,
    },
    flagpoleBigger: {
        position: 'absolute',
        height: 28,
        width: 4,
        marginLeft: 16,
        backgroundColor:'#222',
    },
    flagBigger:{
        position: 'absolute',
        height: 10,
        width: 14,
        marginLeft: 3,
        backgroundColor: '#F22',
    },
    base1Bigger: {
        position: 'absolute',
        height: 4,
        width: 12,
        marginTop: 20,
        marginLeft: 12,
        backgroundColor: '#222',
    },
    base2Bigger: {
        position: 'absolute',
        height: 4,
        width: 20,
        marginTop: 24,
        marginLeft: 8,
        backgroundColor: '#222',
    }
})