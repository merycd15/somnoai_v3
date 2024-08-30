import { PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestAudioPermissions = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    if (
      granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('Permissions not granted');
      return false;
    }
  } else if (Platform.OS === 'ios') {
    const status = await check(PERMISSIONS.IOS.MICROPHONE);
    if (status !== RESULTS.GRANTED) {
      const result = await request(PERMISSIONS.IOS.MICROPHONE);
      if (result !== RESULTS.GRANTED) {
        console.log('Microphone permission not granted');
        return false;
      }
    }
  }
  return true;
};
