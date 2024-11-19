
import AsyncStorage from '@react-native-async-storage/async-storage';


export default handleLogout = async (navigation) => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      
    } finally {
      navigation.navigate('Login');
    }
  };