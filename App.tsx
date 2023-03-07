/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'react-native-axios';
import Header from './components/header';
import Routines from './components/routines';
import Card from './components/card';

function App(): JSX.Element {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://devapi.getgoally.com/v1/api/reminders/all`,
        {
          headers: {
            Authorization: `ddc58e6a-2e69-4f44-97e8-1454eb352069`,
          },
        },
      );
      const newData = response.data.docs;
      setData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  function sortDataAscending() {
    let sortedData = data.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    );
    setData(sortedData);
  }
  const SearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput} />
          <View style={styles.searchIconButton}>
            <Image
              source={require('./assets/icons/search.png')}
              style={{width: 17, height: 20}}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={sortDataAscending}>
          <Image
            source={require('./assets/icons/filter_button.png')}
            style={styles.filterButton}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </View>
    );
  };
  return (
    <>
      <View
        style={styles.statusBarContainer}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            barStyle="dark-content"
            showHideTransition={'slide'}
            backgroundColor="#182545"
            animated={true}
            hidden={false}
          />
        </SafeAreaView>
      </View>
      <Header />
      <View style={styles.sectionContainer}>
        <Card
          title={'Morning Routine'}
          text={'Weekdays\n7:00 AM'}
          icon={require('./assets/icons/navigate_next_black.png')}
          image={require('./assets/icons/sun.png')}
          isEnabled={true}
          isDark={false}
        />
        <Card
          title={'Night Routine'}
          text={'Everyday\n9:00 PM'}
          icon={require('./assets/icons/navigate_next_white.png')}
          image={require('./assets/icons/moon.png')}
          isEnabled={false}
          isDark={true}
        />
      </View>
      <View>
        <SearchBar />
      </View>
      <ImageBackground
        imageStyle={styles.imageBackground}
        style={{flex: 1}}
        source={require('./assets/icons/cloud_moon_background.png')}
        resizeMode="contain">
        <View>
          {isLoading ? (
            <Text style={styles.loading}>Loading...</Text>
          ) : (
            <Routines isLoading={isLoading} data={data} />
          )}
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 5,
    marginTop: 20,
  },
  imageBackground: {
    width: 348,
    height: 309,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchInput: {
    width: Dimensions.get('screen').width - 120,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000000',
    borderRightWidth: 0,
    paddingLeft: 12,
  },
  searchIconButton: {
    width: 41,
    height: 50,
    backgroundColor: '#49B0AB',
    borderWidth: 1,
    borderColor: '#000000',
    borderLeftWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButton: {
    width: 40,
    height: 40,
    marginRight: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  statusBarBackground: {
    backgroundColor: '#182545',
  },
  backgroundColor: {
    backgroundColor: '#FDFCFF',
  },
  loading: {
    paddingLeft: 20,
    marginTop: 12,
  },
  statusBarContainer:{
    height: StatusBar.currentHeight, 
    backgroundColor: '#182545'
  }
});

export default App;
