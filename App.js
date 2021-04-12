/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native'
import params from './src/params'
import MineField from './src/componets/MineField'
import Header from './src/componets/Header'
import LevelSelection from './src/screens/LevelSelection'
import Flag from './src/componets/Flag'
import {
  createMinedBoard,
  openField,
  cloneBoard,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions'
import Field from './src/componets/Field'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
     
  }

  minesAmount = () => {
    const rows = params.getRowsAmount()
    const columns = params.getColumnsAmount()
    return Math.ceil(rows * columns * params.difficultLevel)
  }

  createState = () => {
    const rows = params.getRowsAmount()
    const columns = params.getColumnsAmount()
    return {
      board: createMinedBoard(rows, columns, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    }
  }

  openFieldLocal = (row, column) =>{
    const cloneBoardLocal = cloneBoard(this.state.board)
    openField(cloneBoardLocal, row, column)
    const lost = hadExplosion(cloneBoardLocal)
    const won = wonGame(cloneBoardLocal)

    if(lost){
      showMines(cloneBoardLocal)
      Alert.alert('Perdeeeu mofio!')
    }
    
    if(won){ 
      Alert.alert('Parabéeens')
    }

    this.setState({board: cloneBoardLocal, won, lost})
  }

  selectField = (row, column) => {
    const cloneBoardLocal = cloneBoard(this.state.board)
    invertFlag(cloneBoardLocal, row, column)
    const won = wonGame(cloneBoardLocal)
   
    if(won){ 
      Alert.alert('Parabéeens')
    }
    this.setState({board: cloneBoardLocal, won})
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render() {
    return (
          <View style={styles.container}>
            <LevelSelection isVisible={this.state.showLevelSelection} 
              onLevelSelected={this.onLevelSelected}
              onCancel={() => this.setState({showLevelSelection: false})}>
            </LevelSelection>
            <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
              onNewGame={() => this.setState(this.createState())}
              onFlagPress={() => this.setState({showLevelSelection: true})}>
            </Header>
            <View style={styles.board}>
              <MineField 
              board={this.state.board} 
              onOpenField={this.openFieldLocal}
              onSelectField={this.selectField}
              isEnabled={this.state.lost}
              />
            </View>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#EEE',
    marginBottom: 8
  },
  board:{
    alignItems:'center',
    backgroundColor:'#AAA'
  }
})
