import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NativeModules,
  Slider,
  Image,
} from 'react-native';
import ProgressiveImage from './image'
import { musics } from '../music.json';
import getWeather from './getWeather';

export default class MusicComposer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      currMusic: 0,
      city: null,
      weather: 'raining',
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
    navigator.geolocation.getCurrentPosition(
      ({coords: { latitude, longitude }}) => {
        this.getCity(latitude, longitude);
      },
      (error) => {console.log('error', error);},
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
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

  async getCity(latitude, longitude) {
    const weather = await getWeather(latitude, longitude);

    this.setState({
      city: weather.name,
      weather: weather.weather[0].description,
    });
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
    const coverId = musics[this.state.currMusic].coverId;
    const cover = `https://source.unsplash.com/${coverId}/`;

    return (
      <ProgressiveImage
        style={styles.backgroundImage}
        thumbnailSource={{ uri: cover + '?30x30&bust=' + Math.random() }}
        imageSource={{ uri: cover + '?bust=' + Math.random() }}
        imageFadeDuration={500}
      >
        <Text style={styles.welcome}>
          You are listening to {'\n'}
          {musics[this.state.currMusic].name} {'\n'}
          by {musics[this.state.currMusic].artist}
        </Text>
        <Button
          title="Play"
          color="#FF0DFF"
          onPress={this.play}
          accessibilityLabel="Play the current song"
        />
        <Button
          title="Pause"
          color="#FF0DFF"
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
            color="#FF0DFF"
            onPress={this.previous}
            accessibilityLabel="Previous"
          />
          <Button
            title="Next"
            color="#FF0DFF"
            onPress={this.next}
            accessibilityLabel="Next"
          />
        </View>
        {this.state.city && <View>
          <Text style={styles.welcome}>
            You are in {this.state.city} and the weather is {this.state.weather} today !
          </Text>
        </View>}
      </ProgressiveImage>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: '900',
    color: '#000',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
