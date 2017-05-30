import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
} from 'react-native';

console.log(NativeModules);

export default class MusicComposer extends Component {
  //state = {
  //  test: NativesModules.musicplayer.test(),
  //}

  test = NativeModules.MusicPlayer.test('https://api.soundcloud.com/tracks/261294648/download?secret_token=s-XefW5&client_id=cUa40O3Jg3Emvp6Tv4U6ymYYO50NUGpJ', (data) => {
    console.log(data);
  });

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text style={styles.welcome}>
          Welcome to Musica Composer !
        </Text>
        <Text style={styles.instructions}>
          To get started, walk in my city {this.test}
        </Text>
        <Text style={styles.instructions}>
          We will display you some ass dope music
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
