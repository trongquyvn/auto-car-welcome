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
    const res = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
    } as RequestInit);
    return res.json();
  } catch {
    return false;
  }
};
