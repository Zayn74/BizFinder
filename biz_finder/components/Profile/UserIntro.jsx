import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

const UserIntro = () => {
    const {user}=useUser();
  return (
    <View className='flex justify-center items-center mt-8'>
        <Image source={{uri:user?.imageUrl}} className='w-[100px] h-[100px] rounded-full'/>
        <Text className='font-pbold text-xl mt-5'>{user?.fullName}</Text>
        <Text className='font-pregular text-base mt-2'>{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}

export default UserIntro