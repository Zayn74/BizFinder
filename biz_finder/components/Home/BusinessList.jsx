import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessCard from './BusinessCard';

const BusinessList = () => {
    const [refresh, setRefrech] = useState(false)


    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        GetBusinessList()
    }, [])

    const GetBusinessList = async () => {
        setRefrech(true)
        setBusinessList([]);
        const q = query(collection(db,'business'), limit(10));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            setBusinessList(prev => [...prev, {id:doc.id, ...doc.data()}])
        })
        setRefrech(false)    
    }
    return (
      <View>
      <View className='pl-5 flex-row justify-between items-center mt-5'>
      <Text className='font-psemibold text-lg'>Popular Business</Text>
      <Text className='font-pmedium text-primary text-base mr-5'>View All</Text>
    </View>
    
    <FlatList
    onRefresh={GetBusinessList}
    refreshing={refresh}
    data={businessList}
    showsHorizontalScrollIndicator={false}
    horizontal={true}
    renderItem={({ item, index }) => (
        <BusinessCard business={ item} key={index} />
)}
    />
    </View>
  )
}

export default BusinessList