package com.musiccomposer.musicplayer;

import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;

import android.media.MediaPlayer;
import android.media.AudioManager;
import android.net.Uri;
import java.io.IOException;

public class MusicPlayerModule extends ReactContextBaseJavaModule {
    public MusicPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MusicPlayer";
    }

    @ReactMethod
    public void test(String urlFromJs, Callback cb) {
      Uri url = Uri.parse(urlFromJs);
      MediaPlayer mediaPlayer = new MediaPlayer();
      mediaPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
      try {
        mediaPlayer.setDataSource(getReactApplicationContext(), url);
      } catch (IOException e) {
        cb.invoke(e.getMessage());
      }
      try {
        mediaPlayer.prepare();
      } catch (IOException e) {
        cb.invoke(e.getMessage());
      }
      mediaPlayer.start();
      cb.invoke("OK");
    }
}