import React, {useEffect, useState} from 'react';
import {
  Button,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Game from './src/game';

const App = () => {
  let game = Game.getInstance();
  const [gameState0, setGameState0] = useState(' ');
  const [gameState1, setGameState1] = useState(' ');
  const [gameState2, setGameState2] = useState(' ');
  const [gameState3, setGameState3] = useState(' ');
  const [gameState4, setGameState4] = useState(' ');
  const [gameState5, setGameState5] = useState(' ');
  const [gameState6, setGameState6] = useState(' ');
  const [gameState7, setGameState7] = useState(' ');
  const [gameState8, setGameState8] = useState(' ');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then(url => {
        if (!url) {
          return;
        }
        const urlComponents = url.split('/');
        const gameState = urlComponents[urlComponents.length - 1].replace(
          'c',
          '',
        );
        game.updateState(gameState);
        updateGameBoard();
      });
    }
  }, []);

  const reset = () => {
    Game.reset();
    game = Game.getInstance();
    updateGameBoard();
    setMessage('');
  };

  const updateGameBoard = () => {
    setGameState0(game.getGameState()[0]);
    setGameState1(game.getGameState()[1]);
    setGameState2(game.getGameState()[2]);
    setGameState3(game.getGameState()[3]);
    setGameState4(game.getGameState()[4]);
    setGameState5(game.getGameState()[5]);
    setGameState6(game.getGameState()[6]);
    setGameState7(game.getGameState()[7]);
    setGameState8(game.getGameState()[8]);
    if (game.gameFinished) {
      const winner = game.getWinner();
      if (winner) {
        setMessage(`Winner is ${winner}`);
      } else {
        setMessage(`Draw`);
      }
    }
  };

  useEffect(() => {
    updateGameBoard(game.getGameState());
  }, []);

  const markCell = cellId => {
    const gameFinished = game.markCell(cellId);
    updateGameBoard(game.getGameState());
  };

  const shareGame = () => {
    Share.share({
      message:
        'Yo! See my game board. http://game/' +
        game.getGameState().join('') +
        'c',
    });
  };

  return (
    <View>
      <TouchableOpacity
        style={{width: '20%', alignSelf: 'flex-end'}}
        onPress={shareGame}>
        <Text style={{borderWidth: 2, padding: 10, alignSelf: 'center'}}>
          Share
        </Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => markCell(0)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState0 === '.' ? ' ' : gameState0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => markCell(1)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState1 === '.' ? ' ' : gameState1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markCell(2)}
          style={{
            height: 100,
            width: 100,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState2 === '.' ? ' ' : gameState2}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => markCell(3)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState3 === '.' ? ' ' : gameState3}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markCell(4)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState4 === '.' ? ' ' : gameState4}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markCell(5)}
          style={{
            height: 100,
            width: 100,
            borderBottomWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState5 === '.' ? ' ' : gameState5}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => markCell(6)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState6 === '.' ? ' ' : gameState6}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markCell(7)}
          style={{
            height: 100,
            width: 100,
            borderRightWidth: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.cellText}>
            {gameState7 === '.' ? ' ' : gameState7}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => markCell(8)}
          style={{height: 100, width: 100, justifyContent: 'center'}}>
          <Text style={styles.cellText}>
            {gameState8 === '.' ? ' ' : gameState8}
          </Text>
        </TouchableOpacity>
      </View>
      {!!message && (
        <Text style={{fontSize: 30, color: 'green'}}>{message}</Text>
      )}
      <Button title="Reset" onPress={reset} />
    </View>
  );
};

const styles = StyleSheet.create({
  cellText: {
    fontSize: 90,
    alignSelf: 'center',
  },
});

export default App;
