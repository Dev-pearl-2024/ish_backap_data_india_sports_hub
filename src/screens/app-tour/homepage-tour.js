import { useEffect } from 'react'
import { Image } from 'react-native'
import { Text, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import {
    TourGuideProvider, // Main provider
    TourGuideZone, // Main wrapper of highlight component
    TourGuideZoneByPosition, // Component to use mask on overlay (ie, position absolute)
    useTourGuideController, // hook to start, etc.
  } from 'rn-tourguide'

  
  export const HomeTour = () => {
    const iconProps = { size: 40, color: '#888' }
    const {
      canStart, 
      start, 
      stop, 
      eventEmitter, 
    } = useTourGuideController()
  
   useEffect(() => {
      if (canStart) {
        start()
      }
    }, [canStart])
  
    const handleOnStart = () => console.log('start')
    const handleOnStop = () => console.log('stop')
    const handleOnStepChange = () => console.log(`stepChange`)
  
   useEffect(() => {
      eventEmitter.on('start', handleOnStart)
      eventEmitter.on('stop', handleOnStop)
      eventEmitter.on('stepChange', handleOnStepChange)
  
      return () => {
        eventEmitter.off('start', handleOnStart)
        eventEmitter.off('stop', handleOnStop)
        eventEmitter.off('stepChange', handleOnStepChange)
      }
    }, [])
  
    return (
      <View style={styles.container}>
        {/*
  
            Use TourGuideZone only to wrap your component
  
        */}
        <TourGuideZone
          zone={2}
          text={'A react-native-copilot remastered! 🎉'}
          borderRadius={16}
        >
          <Text style={styles.title}>
            {'Welcome to the demo of\n"rn-tourguide"'}
          </Text>
        </TourGuideZone>
        <View style={styles.middleView}>
          <TouchableOpacity style={styles.button} onPress={() => start()}>
            <Text style={styles.buttonText}>START THE TUTORIAL!</Text>
          </TouchableOpacity>
  
          <TourGuideZone zone={3} shape={'rectangle_and_keep'}>
            <TouchableOpacity style={styles.button} onPress={() => start(4)}>
              <Text style={styles.buttonText}>Step 4</Text>
            </TouchableOpacity>
          </TourGuideZone>
          <TouchableOpacity style={styles.button} onPress={() => start(2)}>
            <Text style={styles.buttonText}>Step 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={stop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
          <TourGuideZone
            zone={1}
            // shape='circle'
            text={'With animated SVG morphing with awesome flubber 🍮💯'}
          >
            {/* <Image source={{ "uri":"" }} style={styles.profilePhoto} /> */}
          </TourGuideZone>
        </View>
        <View style={styles.row}>
          <TourGuideZone zone={4} >
            {/* <Ionicons name='ios-contact' {...iconProps} /> */}
            <Text>step 1</Text>
          </TourGuideZone>
          {/* <Ionicons name='ios-chatbubbles' {...iconProps} /> */}
          {/* <Ionicons name='ios-globe' {...iconProps} /> */}
          <TourGuideZone zone={5}>
          <Text>step 2</Text>
            {/* <Ionicons name='ios-navigate' {...iconProps} /> */}
          </TourGuideZone>
          <TourGuideZone zone={6} >
          <Text>step 3</Text>
            {/* <Ionicons name='ios-rainy' {...iconProps} /> */}
          </TourGuideZone>
          {/* <TourGuideZoneByPosition
            zone={7}
            // shape={'circle'}
            isTourGuide
            bottom={60}
            left={35}
            width={300}
            height={900}
          /> */}
        </View>
      </View>
    )
  }

  const styles = {}