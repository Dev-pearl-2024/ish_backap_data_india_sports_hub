import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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
import AllTournament from '../screens/all-tournament/allTournament';
import TournamentView from '../screens/tournament-view/tournamentView';
import AllSports from '../screens/allsports/AllSports';
import Score from '../components/allsportsComponents/score/Score';
import Tournament from '../components/allsportsComponents/tournament/Tournament';
import News from '../components/allsportsComponents/newsAndMedia/News';
import IndianAthlete from '../components/allsportsComponents/indianAthlete/IndianAthlete';
import Schedule from '../components/allsportsComponents/schedule/Schedule';
import Rules from '../components/allsportsComponents/rules/Rules';
import Records from '../components/allsportsComponents/records/Records';
import AllRanking from '../screens/allRanking/allRanking';
import AllRankingIndex from '../screens/allRanking';
import Favorite from '../screens/Favorite/Favorite';
import FavoriteStack from '../screens/Favorite/favoriteFromStackNav';
import BlogView from '../screens/blog/blogView';
import BlogProfileView from '../screens/blog/blogProfileView';
import CalendarStackNav from '../screens/Calendar/CalendarFromStackNav';
import AllArchieve from '../screens/all-archieve/allArchieve';
import AllArchieveTournament from '../screens/all-archieve/arhieveTournamentSelection';
import LatestInterNationalView from '../screens/Home/LatestInternationalView';
import LatestDomesticView from '../screens/Home/LatestDomesticView';
import LatestNewsView from '../screens/Home/LatestNewsView';
import Notification from '../screens/notification/noification';
import IndividualSport from '../screens/indivisualSportsScreen/individualSports';
import SportsAllTournament from '../components/allsportsComponents/sportsAllTournament/sportsAllTournament';
import AllRecordIndex from '../screens/all-records';
import AthleticScore from '../screens/score-screens/athletic';
import ChatRoom from '../screens/chatRoom';
import Plans from '../screens/plans/plans';
import Result from '../screens/plans/result';
import CalendarIndexComponent from '../screens/Calendar/CalendarIndex';
import SearchPage from '../screens/search';
import { Linking } from 'react-native';
import AdminPanel from '../screens/admin-panel/AdminPanel';
import { withIAPContext } from 'react-native-iap';
import { useEffect } from 'react';
import Teams from '../screens/teams/teams';
import TeamList from '../screens/teams/teamList';
import TeamProfile from '../screens/teams/team-profile';
import { Text } from 'react-native';
// import Chat from '../screens/chatRoom/chat';


Linking.addEventListener('url', (event) => {
  console.log('URL:', event.url);
});

Linking.getInitialURL().then((url) => {
  if (url) {
    console.log('Initial URL:', url);
  }
});



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const linking = {
    prefixes: ['https://indiasportshub.com'],
    config: {
      screens: {
        BlogView: {
          path: ':slug', // matches the article slug
          parse: {
            slug: slug => slug,
          },
        },
        // other routes if needed...
      },
    },
  };
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Sidebar" component={Sidebar} />
        <Stack.Screen name="user-profile" component={UserProfile} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="athelete-profile" component={AthleteProfile} />
        <Stack.Screen name="referral" component={Referral} />
        <Stack.Screen name="referral-list" component={ReferralList} />
        <Stack.Screen name="all-tournament" component={AllTournament} />
        <Stack.Screen name="teams" component={Teams} />
        <Stack.Screen name="team-list" component={TeamList} />
        <Stack.Screen name="team-profile" component={TeamProfile} />
        <Stack.Screen
          name="sports-tournament"
          component={SportsAllTournament}
        />
        <Stack.Screen name="tournament-view" component={TournamentView} />
        <Stack.Screen name="all-sports" component={AllSports} />
        <Stack.Screen name="individual-sport" component={IndividualSport} />
        <Stack.Screen name="Score" component={Score} />
        <Stack.Screen name="Tournament" component={Tournament} />
        <Stack.Screen name="IndianAthlete" component={IndianAthlete} />
        <Stack.Screen name="News" component={News} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Rules" component={Rules} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="AllRanking" component={AllRanking} />
        <Stack.Screen name="all-ranking-index" component={AllRankingIndex} />
        <Stack.Screen name="Favorite" component={FavoriteStack} />
        <Stack.Screen name="calendar" component={CalendarStackNav} />
        <Stack.Screen name="calendar-index" component={CalendarIndexComponent} />
        <Stack.Screen name="blog-view" component={BlogView} />
        <Stack.Screen name="all-archieve" component={AllArchieve} />
        <Stack.Screen name="notification" component={Notification} />
        <Stack.Screen name="search" component={SearchPage} />
        <Stack.Screen name="all-record-index" component={AllRecordIndex} />
        <Stack.Screen name="admin-panel" component={AdminPanel} />
        <Stack.Screen
          name="archieve-tournament"
          component={AllArchieveTournament}
        />
        <Stack.Screen
          name="latest-international-view"
          component={LatestInterNationalView}
        />
        <Stack.Screen
          name="latest-domestic-view"
          component={LatestDomesticView}
        />
        <Stack.Screen name="latest-news-view" component={LatestNewsView} />
        <Stack.Screen name="blog-profile-view" component={BlogProfileView} />
        <Stack.Screen name="score-view" component={AthleticScore} />
        <Stack.Screen name="score-view-new" component={AthleticScore} />

        <Stack.Screen name="chat-room" component={ChatRoom} />
        {/* <Stack.Screen name="chat" component={Chat} /> */}

        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="plans" component={withIAPContext(Plans)} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
