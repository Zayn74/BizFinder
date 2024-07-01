import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const BusinessCard = ({ business,image,design2,design1 }) => {
  const router= useRouter()
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={()=> router.push('/businessdetail/'+ business.id)}  className={ `${design1} mx-3 p-[10px] bg-white rounded-2xl mt-4`}>
      <Image
      source={{uri:business?.imageUrl}}
      className={`${image} w-[200px] h-[130px] rounded-2xl`}
      />
      <View className={`gap-1 pt-3 ${design2}`}>
              <Text className={`font-pbold text-sm text-start `}>{business.name}</Text>
              <Text className='font-pregular text-gray-400 text-xs' >{business.address}</Text>
              <View className='flex-row justify-between mr-0.5'>
              <View className=' flex-row gap-1'>
                  <Image source={require('./../../assets/images/star.png')} className='w-[15px] h-[15px]' />
                  <Text className=' font-plight text-gray-400'>{business.rating}</Text>
              </View>
              <Text className='text-xs font-plight text-gray-400'>{business.category}</Text>
              </View>
      </View>
    </TouchableOpacity>
  )
}

export default BusinessCard