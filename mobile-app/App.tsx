import { useEffect } from 'react';
import { NativeModules, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { downloadMP3, validateUrl, path } from './file';
import Sound from 'react-native-sound';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
// https://ejjptcukabcxfwidxodr.supabase.co/storage/v1/object/public/cars/uploads/bin.mp3
const url = 'https://auto-car-welcome.vercel.app/audio/bin.mp3';
function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const runSound = async () => {
    console.log('start runSound');
    try {
      const valid = await validateUrl(url);
      if (valid) {
        await downloadMP3(url);
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
  }, []);

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: safeAreaInsets.top,
        backgroundColor: '#fff',
      }}
    >
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ color: 'black' }}>Welcome</Text>
    </View>
  );
}

export default App;
