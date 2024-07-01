import { View, Text, FlatList, Image, TouchableOpacity, StatusBar, Share } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

const MenuList = () => {
  const {signOut}=useAuth()
    const menuList = [
        {
            id: 1,
            name: 'Add Business',
            icon: require('./../../assets/images/addbusiness.png'),
            path:'/business/add-business'
        },
        {
            id: 2,
            name: 'My Business',
            icon: require('./../../assets/images/bulding.png'),
            path:'/business/my-business'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('./../../assets/images/sharing.png'),
            path:'share'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('./../../assets/images/logout.png'),
            path:'logout'
        },
  ]
  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.path == 'logout') {
      signOut();
      return;
    }
    if (item.path == 'share') {
      Share.share({message:'Donwload Our App by Zayn'})
    }
    router.push(item.path)
  }
  return (
    <View className='mt-16 '>
      <FlatList
      data={menuList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity onPress={()=>onMenuClick(item)} activeOpacity={0.5} key={index} className=' flex-row items-center gap-[10px] flex-1 p-[10px] pb-4 border-2 border-primary mx-1 rounded-2xl my-4'>
            <Image source={item.icon} className='w-[30px] h-[30px]'/>
            <Text className='font-pmedium text-base flex-1 '>{item.name}</Text>
        </TouchableOpacity>
      )}
      />
      <Text className='text-center text-sm top-60 text-gray-400'>Developed By Zayn© @2024 </Text>
      </View>
  )
}

export default MenuList