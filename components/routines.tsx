import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';



const Routines = ({isLoading, data}) => {
 
  const [page, setPage] = useState(1);

  const [isEndReached, setIsEndReached] = useState(false);
  const [routines, setRoutines] = useState([]);

  function displayDataByPageNumber(dataArray: [], pageNumber: number) {
    const startIndex = (pageNumber - 1) * 5;
    const endIndex = startIndex + 5;
    const pageRoutines = dataArray.slice(startIndex, endIndex);
    if (pageRoutines.length > 0) {
      setRoutines(prevRoutines => [...prevRoutines, ...pageRoutines]);
    } else {
      setIsEndReached(true);
    }
  }
  useEffect(() => {
    displayDataByPageNumber(data, 1);
  }, []);

  const renderItem = ({item}) => (
    <View>
      <View style={styles.container}>
        <View style={styles.section}>
          <Image
            source={{uri: item.visualAidUrl}}
            style={styles.sectionImage}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.entityType}>{item.entityType}</Text>
          </View>
        </View>
        <View>
          <Image
            source={require('../assets/icons/navigate_next_black.png')}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.lineSeparator}></View>
    </View>
  );

  const handleLoadMore = () => {
    if (!isLoading && !isEndReached) {
      setPage(prevPage => prevPage + 1);
      displayDataByPageNumber(data, page);
    }
  };

  return (
    <FlatList
      data={routines}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      contentContainerStyle={{paddingBottom: 50}}
      scrollEnabled={true}
      ListFooterComponent={
        isLoading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : null
      }
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'space-between',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionImage: {
    width: 48,
    height: 48,
  },
  itemName: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '500',
    paddingLeft: 6,
  },
  entityType: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: '500',
    paddingLeft: 6,
  },
  arrowIcon: {
    width: 22,
    height: 22,
  },
  lineSeparator: {
    width: Dimensions.get('screen').width - 40,
    height: 2,
    backgroundColor: '#BAC1CA',
    alignSelf: 'center',
  },
});

export default Routines;
