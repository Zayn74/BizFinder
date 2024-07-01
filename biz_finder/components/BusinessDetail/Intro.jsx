import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


const Intro = ({ business }) => {
    const router=useRouter()
  return (
    <View>
        <View className='top-80 left-80 absolute z-10 flex-row justify-between w-full p-5'>
        <Ionicons name="heart-outline" size={40} color="red"/>
        </View>
        
      <Image source={{uri:business?.imageUrl}} className='w-full h-[340px]'/>
      <View className='p-5 bg-white -mt-5 rounded-t-3xl'>
        <Text className='font-pbold text-2xl'>{business?.name}</Text>
        <Text className='font-pregular text-lg'>{business?.address}</Text>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  )
}

export default Intro