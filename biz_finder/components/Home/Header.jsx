import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import SearchInput from '../searchInput';

const Header = () => {
    const {user}=useUser();
  return (
    <View className='px-[20px] pt-[50px] bg-primary  rounded-2xl'>
        <View className='flex flex-row items-center gap-3'>
            <Image source={{uri:user?.imageUrl}} className='h-[45px] w-[45px] rounded-full '/>
            <View className=' justify-center w-20' >
                <Text className='font-pregular text-white '>Welcome,</Text>
                <Text className='font-pbold text-lg text-white'>{user?.fullName}</Text>
            </View>
        </View>
        <SearchInput/>
    </View>
  )
}

export default Header