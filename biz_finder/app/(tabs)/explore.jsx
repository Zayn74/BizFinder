import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/searchInput'
import Category from '../../components/Home/Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList'


const explore = () => {
  const [businessList, setBusinessList] = useState([])
  
  const GetBusinessByCategory = async (category) => {
    setBusinessList([])
    const q = query(collection(db, 'business'), where('category', '==', category))
    const querySnapShot = await getDocs(q)
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
    }
  return (

    <View className='p-5 mt-10 '>
      <Text className='font-pbold text-2xl'>Explore More!</Text>
      <SearchInput design='border-primary rounded-lg border mt-5 ' />
      <Category design='w-full mt-3' flat='m-0' explore={true} onCategorySelect={(category)=>GetBusinessByCategory(category)} />
      <ExploreBusinessList businessList={businessList}/>
      </View>
  )
}

export default explore