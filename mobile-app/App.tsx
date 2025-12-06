import { useEffect } from 'react';
import { NativeModules, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { downloadMP3, validateUrl, path } from './file';
import Sound from 'react-native-sound';
import { publicAPI, publicURL, userKey } from './constant';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const runSound = async () => {
    console.log('start runSound');
    try {
      const check = publicURL + '/release/' + userKey + '.json';
      const valid = await validateUrl(check);
      if (valid && valid.release) {
        const endCheck = publicAPI + '/' + userKey;
        validateUrl(endCheck);
        const downLoadURL = publicURL + '/uploads/' + userKey + '.mp3';
        await downloadMP3(downLoadURL);
      }
      playSound();
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
  };

  const playSound = () => {
    const sound = new Sound(path, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      sound.setVolume(2);
      NativeModules.AppKillerModule.moveToBackground();
      sound.play(success => {
        if (!success) console.log('Playback failed');
        NativeModules.AppKillerModule.killApp();
      });
    });
  };

  useEffect(() => {
    runSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: safeAreaInsets.top,
        backgroundColor: 'black',
      }}
    >
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ color: '#fff', fontSize: 40, textAlign: 'center' }}>
        Welcome to Auto-Car
      </Text>
    </View>
  );
}

export default App;
