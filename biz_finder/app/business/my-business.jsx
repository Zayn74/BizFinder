import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { query } from 'firebase/database';
import { collection, getDocs, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BusinessListCard from '../../components/Explore/BusinessListCard';
import { useNavigation } from 'expo-router';

const myBusiness = () => {
    const { user } = useUser();
    const navigation=useNavigation()

    const [businessList, setBusinessList] = useState([])
    const [refresh, setRefrech] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: 'My Business',
        })
        user&&GetUserBusiness()
    }, [user])
    


    const GetUserBusiness = async () => {
        setRefrech(true)
        setBusinessList([])
        const q = query(collection(db, 'business'), where('useremail', '==', user?.primaryEmailAddress.emailAddress))
        
        const querySnapSHot= await getDocs(q)

        querySnapSHot.forEach((doc) => {
            console.log(doc.data());
            setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
        setRefrech(false)
    }
  return (
    <View className='p-5  h-full'>
      <Text className='text-4xl font-pbold mb-10'>My Business</Text>
      <FlatList
      onRefresh={GetUserBusiness}
      refreshing={refresh}
      data={businessList}
      renderItem={({item,index})=>(
        <BusinessListCard business={item}
        key={index}
        />
      )}
      />
    </View>
  )
}

export default myBusiness