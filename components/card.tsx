import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Image,
  View,
  Switch,
} from 'react-native';

function Card({title, text, image, icon, isEnabled, isDark}): JSX.Element {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={[
          styles.container,
          {backgroundColor: isDark ? '#103C58' : '#CFE4FF'},
        ]}>
        <View style={styles.section}>
          <Text style={[styles.text, {color: isDark ? '#FDFCFF' : '#1F1F1F'}]}>
            {text}
          </Text>
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.subSection}>
          <Switch
            value={isEnabled}
            trackColor={{false: '#72777F', true: '#72CEBC'}}
          />
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.5,
    fontWeight: '500',
    color: '#1A1C1E',
    textAlign: 'center',
    paddingBottom: 6,
  },
  container: {
    width: Dimensions.get('screen').width / 2.2,
    height: 125,
    borderRadius: 12,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  image: {
    width: 40,
    height: 40,
  },
  subSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default Card;
