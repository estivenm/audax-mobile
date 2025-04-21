import React, { useEffect } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularLoader = () => {
  const rotation = new Animated.Value(0);

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      })
    );

    spin.start();
  }, []);

  const rotationInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={100}
        width={8}
        fill={80}
        tintColor="#F7B500"
        backgroundColor="#E5E6EC"
        rotation={0}
        lineCap="round"
        duration={800}
        prefill={10}
        arcSweepAngle={360}
        onAnimationComplete={() => {}}
        style={[styles.loader, { transform: [{ rotate: rotationInterpolate }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {},
});

export default CircularLoader;
