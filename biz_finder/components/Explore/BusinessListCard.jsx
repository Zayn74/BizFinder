import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const BusinessListCard = ({ business }) => {
    const router=useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push('/businessdetail/'+business.id)} className='bg-white rounded-2xl mt-4'>
      <Image source={{uri:business?.imageUrl}} className='w-full h-[150px] rounded-t-2xl'/>
      <View className='p-3'>
        <Text className='font-pbold text-xl'>{business?.name} </Text>
        <Text className='font-pregular text-gray-500'>{business?.address} </Text>
      </View>
    </TouchableOpacity>
  )
}

export default BusinessListCard