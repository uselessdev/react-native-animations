import React, { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { View, PanResponder, Animated, Dimensions, LayoutAnimation, UIManager } from 'react-native'

const position = new Animated.ValueXY()

const SCREEN_WIDTH = Dimensions.get('window').width * 1.5
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH
const SWIPE_OUT_DURATION = 250

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Deck = ({ data, renderCard, renderEmpty, onSwipeRight, onSwipeLeft }) => {
  const [idx, setIdx] = useState(0)

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start()
  }

  const onSwipeComplete = direction => {
    const item = data[idx]
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item)

    position.setValue({ x: 0, y: 0 })

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.spring
    )

    setIdx(idx + 1)
  }

  const forceSwipe = (direction) => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH

    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction))
  }

  const panresponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },
    onPanResponderRelease: (event, gesture) => {
      const isright = gesture.dx > SWIPE_THRESHOLD
      const isleft = gesture.dx < SWIPE_THRESHOLD

      if (isright) {
        forceSwipe('right')
      } else if (isleft) {
        forceSwipe('left')
      } else {
        resetPosition()
      }
    },
  })

  const positions = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      outputRange: ['-120deg', '-0deg', '120deg'],
    })

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    }
  }

  const renderCards = (cards, render) => cards.map((card, index) => {
    if (index < idx) {
      return null
    }

    if (index === idx) {
      return (
        <Animated.View key={card.id} style={[positions(), styles.card]} {...panresponder.panHandlers}>
          {render(card)}
        </Animated.View>
      )
    }

    return (
      <Animated.View
        key={card.id}
        style={[styles.card, { top: 8 }]}
      >
        {render(card)}
      </Animated.View>
    )
  }).reverse()

  if (idx >= data.length) {
    return renderEmpty()
  }

  return (
    <View>
      {renderCards(data, renderCard)}
    </View>
  )
}

const styles = {
  card: {
    width: '100%',
    position: 'absolute'
  }
}

export default Deck
