import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';

function Header(): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require('../assets/icons/home_button.png')}
          style={styles.button}
        />
      </View>
      <View>
        <Text style={styles.title}>Routines</Text>
      </View>
      <View>
        <Image
          source={require('../assets/icons/setting_button.png')}
          style={styles.button}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width,
    height: 60,
    backgroundColor: '#182545',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: -0.5,
    color: '#FFFFFF',
  },
  button: {
    width: 36,
    height: 36,
  },
});

export default Header;
