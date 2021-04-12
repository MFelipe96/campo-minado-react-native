import React from 'react'
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native'
import params from '../params'
import Mine from './Mine'
import Flag from './Flag'


function setColorByNumbersNearMines(nearMines, color){
    if(nearMines > 0){
        switch(nearMines){
            case 1:
                return '#2A28D7'
            case 2:
                return '#2B520F'
            case 3 || 4 || 5:
                return '#F9060A'
            case 6 || 7 || 8:
                return '#F221A9'
        }
    }
}

export default props => {

    const {mined, opened, nearMines, exploded, flagged} = props
    const styleField = [styles.field]
    if(opened) styleField.push(styles.opened)
    if(exploded) styleField.push(styles.exploded)
    if(flagged) styleField.push(styles.flagged)
    if(!opened && !exploded) styleField.push(styles.regular)

    let color = setColorByNumbersNearMines(nearMines, color)

    return (
        <TouchableWithoutFeedback 
            onPress={props.onOpen} 
            disabled={props.isEnabled}
            onLongPress={props.onSelect}>
                <View style={styleField}>
                    {!mined && opened & nearMines > 0 ?
                    <Text style={styles.label, {color: color}}>{nearMines}</Text> : false}
                    {mined && opened ? <Mine/> : false} 
                    {flagged && !opened ? <Flag/> : false}
                </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field:{
        height:params.blockSize,
        width:params.blockSize,
        borderWidth:params.borderSize,
    },
    regular:{
        backgroundColor:'#999',
        borderLeftColor:'#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened:{
        backgroundColor:'#999',
        borderColor:'#777',
        alignItems: 'center',
        justifyContent:'center'
    },
    label: {
        fontWeight: 'bold',
        fontSize:params.fontSize
    },
    exploded:{
        backgroundColor: 'red',
        borderColor: 'red'
    }
})