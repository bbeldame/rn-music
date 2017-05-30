import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  Slider,
} from 'react-native';
import { musics } from '../music.json';

console.log(NativeModules);

export default class MusicComposer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currMusic: 0,
    }
  }

  componentDidMount() {
    NativeModules.MusicPlayer.newMusic(
      musics[this.state.currMusic].url,
      true,
      function(data) {
        console.log(data);
      }
    );
  }

  componentDidUpdate() {
    NativeModules.MusicPlayer.newMusic(
      musics[this.state.currMusic].url,
      true,
      function(data) {
        console.log(data);
      }
    );
  }

  play = () => {
    NativeModules.MusicPlayer.play((err) => { console.log('error', error); });
  };

  pause = () => {
    NativeModules.MusicPlayer.pause((err) => { console.log('error', error); });
  };

  changeVolume = (value) => {
    NativeModules.MusicPlayer.setVolume(value, (err) => {
      console.log('error', err);
    });
  };

  previous = () => {
    if (this.state.currMusic == 0) {
      this.setState({ currMusic: musics.length - 1 });
    } else {
      this.setState({ currMusic: this.state.currMusic - 1 });
    }
  };

  next = () => {
    if (this.state.currMusic == musics.length - 1) {
      this.setState({ currMusic: 0 });
    } else {
      this.setState({ currMusic: this.state.currMusic + 1 });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Play"
          color="#841584"
          onPress={this.play}
          accessibilityLabel="Play the current song"
        />
        <Text style={styles.welcome}>
          You are listening to {musics[this.state.currMusic].name} !
        </Text>
        <Button
          title="Pause"
          color="#841584"
          onPress={this.pause}
          accessibilityLabel="Learn more about this purple button"
        />
        <Slider
          minimumValue={0}
          maximumValue={100}
          onValueChange={this.changeVolume}
          value={50}
          style={ { width: '100%' } }
        />
        <View>
          <Button
            title="Previous"
            color="#841584"
            onPress={this.previous}
            accessibilityLabel="Previous"
          />
          <Button
            title="Next"
            color="#841584"
            onPress={this.next}
            accessibilityLabel="Next"
          />
        </View>
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
});
