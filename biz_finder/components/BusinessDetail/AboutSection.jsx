import { View, Text } from 'react-native'
import React from 'react'

const AboutSection = ({business}) => {
  return (
    <View className='bg-white p-4'>
      <Text className='font-pbold text-xl'>About</Text>
      <Text className='font-pregular text-lg mt-6'>{business?.about}</Text>
    </View>
  )
}

export default AboutSection