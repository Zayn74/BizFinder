import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

const profile = () => {
  return (
    <SafeAreaView className='h-full'>
    <View className='p-5  bg-white h-full'>
      <Text className='text-4xl font-pbold  mt-20'>Profile</Text>
      <UserIntro />
      <MenuList />
      <StatusBar barStyle='dark-content'/>
    </View>
    </SafeAreaView>
  )
}

export default profile