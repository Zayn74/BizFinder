import { View, Text, FlatList, Image, TouchableOpacity, Linking, Share } from 'react-native'
import React from 'react'

const ActionButton = ({business}) => {
    const actionButtonMenu = [
        {
            id: 1,
            name: 'Call',
            icon: require('./../../assets/images/accept-call-icon.png'),
            url:'tel:'+business?.contact
        },
        {
        id: 2,
        name: 'Location',
        icon: require ('./../../assets/images/address-icon.png'),
        url:'https://www.google.com/maps/search/?api=1&query='+business?.address
        },
        {
        id: 3,
        name: 'Website',
        icon: require( './../../assets/images/website-icon.png'),
        url:business?.website
        },
        {
        id: 4,
        name: 'Share',
        icon: require( './../../assets/images/share-icon.png'),
        url:business?.website
        },
    ]
    const onPressHandler = (item) => {
      if (item.name == 'Share') {
        Share.share({
            message:'Name: ' +business?.name+"\n Address: " +business.address
          })
            return;
        }
        Linking.openURL(item.url);
    }
  return (
    <View className='bg-white p-4 flex-row justify-between px-4'>
      {/* <FlatList
      data={actionButtonMenu}
      numColumns={4}
      columnWrapperStyle={{justifyContent:'space-between'}}
      renderItem={({item,index})=>(
        <TouchableOpacity key={index} className='items-center' onPress={()=>onPressHandler(item)}>
            <Image source={item?.icon} className='w-[40px] h-[40px]' resizeMode='contain'/>
            <Text className='font-pmedium'>{item.name}</Text>
        </TouchableOpacity>
      )}
      /> */}
      {actionButtonMenu.map((item, index) => (
      <TouchableOpacity key={index} className='items-center' onPress={()=>onPressHandler(item)}>
        <Image source={item?.icon} className='w-[45px] h-[45px]' resizeMode='contain'/>
        <Text className='font-pmedium'>{item.name}</Text>
    </TouchableOpacity>
      ))
      }
    </View>
  )
}

export default ActionButton