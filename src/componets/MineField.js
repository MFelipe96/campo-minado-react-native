import React from 'react'
import {View, StyleSheet} from 'react-native'
import Field from './Field'

export default props => {

    const rows = props.board.map((row, rowIndex) => {
        const columns = row.map((field, columnIndex) => {
            return <Field  
            onOpen={() => props.onOpenField(rowIndex, columnIndex)} 
            onSelect={e => props.onSelectField(rowIndex, columnIndex)}
            isEnabled={props.isEnabled}
            {...field} key={columnIndex}/>
        })
        return <View style={{flexDirection: 'row',}} key={rowIndex}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE'
    },

})