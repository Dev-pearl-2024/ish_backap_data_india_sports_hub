import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import Splash from '../screens/splash/Splash';
import SignUp from '../screens/auth/SignUp';
import Login from '../screens/auth/Login';
import Sidebar from '../screens/Sidebar/Sidebar';
import UserProfile from '../screens/user-profile/user-Profile';
import Settings from '../screens/settings/settings';
import AthleteProfile from '../screens/athlete-profile/athlete-profile';
import Referral from '../screens/referral/referral';
import ReferralList from '../screens/referral/referral-list';
import AllSports from '../screens/allsports/AllSports';
import Archery from '../screens/indivisualSportsScreen/Archery';
import Score from '../components/allsportsComponents/score/Score';
import Tournament from '../components/allsportsComponents/tournament/Tournament';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="user-profile" component={UserProfile} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="athelete-profile" component={AthleteProfile} />
        <Stack.Screen name="referral" component={Referral} />
        <Stack.Screen name="referral-list" component={ReferralList} />
        <Stack.Screen name="all-sports" component={AllSports} />
        <Stack.Screen name="Archery" component={Archery} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="Tournament" component={Tournament} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
