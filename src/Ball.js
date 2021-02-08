import React, { useEffect } from 'react'
import { View, Animated } from 'react-native'

const position = new Animated.ValueXY(0, 0)

const Ball = () => {
  useEffect(() => {
    Animated.spring(position, {
      toValue: { x: 200, y: 500 },
      useNativeDriver: false,
    }).start()
  }, [])

  return (
    <Animated.View style={position.getLayout()}>
      <View style={styles.ball} />
    </Animated.View>
  )
}

const styles = {
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 30,
    borderColor: 'black'
  }
}

export default Ball
