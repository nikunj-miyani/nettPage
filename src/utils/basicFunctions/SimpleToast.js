import Toast from 'react-native-simple-toast';
const __simpleToast = title =>
  setTimeout(() => {
    Toast.show(title, Toast.SHORT);
  }, 500);

export {__simpleToast};
