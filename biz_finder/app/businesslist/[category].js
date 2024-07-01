import { View, Text, FlatList, Image, StatusBar, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import BusinessListCategory from '../../components/BusinessList/BusinessListCategory'

const businessList = () => {
    const navigation = useNavigation()
    const { category } = useLocalSearchParams()
    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle:category
        })
        getBusinessList()
    }, [])
    

    const getBusinessList = async () => {
        setLoading(true)
        const q = query(collection(db, 'business'), where('category', '==', category))
        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {
            setBusinessList(prev=>[...prev,{id: doc?.id, ...doc.data()}])
        })
        setLoading(false)
    }
  return (
    <View>
        {businessList?.length>0&&loading==false ?<FlatList
        data={businessList}
        onRefresh={getBusinessList}
        refreshing={loading}
        renderItem={({item, index}) => (
            <BusinessListCategory
            business={item}
            key={index}
        />
        )}
    />:
    loading?<ActivityIndicator
    size={'large'}
    className='mt-[80%]'
    color={"#7F57F1"}
    />:
    <View className='flex items-center justify-center mt-10'>
        <Image source={require('./../../assets/images/pngwing.com.png')} className='w-[300px] h-[300px] ' />
        <Text className='font-pextrabold text-center text-2xl'>No Business Found!</Text>
        </View>}
        <StatusBar barStyle="dark-content" />
        
    </View>
  )
}

export default businessList