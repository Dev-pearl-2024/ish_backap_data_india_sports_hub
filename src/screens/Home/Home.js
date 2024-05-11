import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState,useEffect} from 'react';
import Header from '../../components/Header/Header';
import COLORS from '../../constants/Colors';
import LatestNews from '../../components/HomeComponents/LatestNews';
import LatestInterNation from '../../components/HomeComponents/LatestInterNation';
import LatestDomestic from '../../components/HomeComponents/LatestDomestic';
import BlueHockey from '../../assets/icons/sportIcons/BlueHockey.js';
import BlueBasketball from '../../assets/icons/sportIcons/BlueBasketball.js';
import BlueBaseball from '../../assets/icons/sportIcons/BlueBaseball.js';
import BlueFootball from '../../assets/icons/sportIcons/BlueFootball.js';
import {useDispatch, useSelector} from 'react-redux';
import {fetchHomePageEventRequest} from "../../redux/actions/eventActions.js"

const Home = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [internationalData, setInternationalData] = useState([]);
  const [domesticData, setDomesticData] = useState([]);
  const eventData = useSelector(state => state?.eventReducer?.homePageEventData?.data);
 
useEffect(() => {
  dispatch(fetchHomePageEventRequest());
}, [dispatch]);

useEffect(() => {
  if(eventData){
    const interEventData = eventData?.internationalEvents;
    const domesticEventData = eventData?.domasticEvents;
    setInternationalData(interEventData);
    setDomesticData(domesticEventData);
  }
}, [internationalData,domesticData,eventData]);


  const headMenu = [
    {title: 'View All', icon: ''},
    {
      title: 'Field Hockey',
      icon: <BlueHockey color={activeTab === 1 ? 'white' : '#0166C2'} />,
    },
    {
      title: 'Basketball',
      icon: <BlueBasketball color={activeTab === 2 ? 'white' : '#0166C2'} />,
    },
    {
      title: 'Baseball',
      icon: <BlueBaseball color={activeTab === 3 ? 'white' : '#0166C2'} />,
    },
    {
      title: 'Football',
      icon: <BlueFootball color={activeTab === 4 ? 'white' : '#0166C2'} />,
    },
  ];

  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 16, gap: 6,paddingVertical:10}}>
              {headMenu.map((data, id) => {
                return (
                  <TouchableOpacity
                    style={
                      activeTab === id
                        ? styles.categoryButton
                        : styles.categoryButtonInactive
                    }
                    key={id}
                    onPress={() => setActiveTab(id)}>
                    {data.icon}
                    <Text
                      style={
                        activeTab === id
                          ? styles.activeText
                          : styles.inactiveText
                      }>
                      {data.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <LatestInterNation internationalData={internationalData}/>
          <LatestDomestic domesticData={domesticData}/>
          <LatestNews showTitle={true} />
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },

  categoryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
  },
  categoryButtonInactive: {
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    paddingVertical: 8,
    borderRadius: 30,
    flexDirection: 'row',
    gap: 5,
  },
  activeText: {
    color: COLORS.white,
  },
  inactiveText: {
    color: COLORS.black,
  },
  carouselHeadingContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    marginBottom: 16,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    color: COLORS.black,
  },
});
