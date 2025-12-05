import { useEffect } from 'react';
import { NativeModules, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Sound from 'react-native-sound';

function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const runSound = () => {
    console.log('start runSound');
    const sound = new Sound('my.mp3', Sound.MAIN_BUNDLE, error => {
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
      <Text style={{ color: 'black' }}>Welcome to Thắng's Family</Text>
    </View>
  );
}

export default App;
