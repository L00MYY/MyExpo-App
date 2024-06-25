import React, { useEffect } from 'react';
import { StyleSheet, View, Image, ImageBackground } from 'react-native';

export default function SplashScreen2() {
  useEffect(() => {

  }, []);

  return (
      <View style={styles.container}>
        <Image
          source={require('../img/logo_rical.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});