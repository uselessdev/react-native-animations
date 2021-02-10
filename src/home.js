import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Card, Button } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native';
import Deck from './Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: require('../assets/01.jpg') },
  { id: 2, text: 'Card #2', uri: require('../assets/02.jpg') },
  { id: 3, text: 'Card #3', uri: require('../assets/03.jpg') },
  { id: 4, text: 'Card #4', uri: require('../assets/04.jpg') },
  { id: 5, text: 'Card #5', uri: require('../assets/05.jpg') },
  { id: 6, text: 'Card #6', uri: require('../assets/06.jpg') },
  { id: 7, text: 'Card #7', uri: require('../assets/07.jpg') },
  { id: 8, text: 'Card #8', uri: require('../assets/08.jpg') },
];

function renderCard (item) {
  return (
    <Card containerStyle={{ padding: 0 }}>
      <Card.Title style={{ paddingTop: 8 }}>{item.text}</Card.Title>
      <Card.Divider style={{ marginBottom: 0 }} />
      <Card.Image source={item.uri} />
      <Text style={{ padding: 16 }}>{item.text}</Text>
      <Button backgroundColor="#03A9F4" title="Miau Miau" style={{ margin: 16, marginTop: 0 }} onPress={() => {}} />
    </Card>
  )
}

export default function App () {
  return (
    <View style={styles.container}>
      <Deck
        data={DATA}
        renderCard={renderCard}
        onSwipeLeft={() => {}}
        onSwipeRight={() => {}}
        renderEmpty={() => (
          <Card containerStyle={{ marginVertical: 32 }}>
            <Card.Title>Miau Miau Caralho!</Card.Title>
            <Button title="Mais gatu" />
          </Card>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    backgroundColor: '#e9e9e9'
  },
});
