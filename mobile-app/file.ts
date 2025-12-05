import RNFS from 'react-native-fs';

export const path = `${RNFS.DocumentDirectoryPath}/example.mp3`;
export const downloadMP3 = async (url: string) => {
  try {
    const result = await RNFS.downloadFile({
      fromUrl: url,
      toFile: path,
      background: true,
      discretionary: true,
    }).promise;

    console.log('Download complete', result);
  } catch (error) {
    console.log('Download failed', error);
  }
};

export const validateUrl = async (url: string) => {
  try {
    const res = await fetch(url, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
};

export const playMP3 = () => {
  // const path = `${RNFS.DocumentDirectoryPath}/example.mp3`;
  // const sound = new Sound(path, '', error => {
  //   if (error) {
  //     console.log('Failed to load sound', error);
  //     return;
  //   }
  //   sound.play(() => sound.release());
  // });
};
