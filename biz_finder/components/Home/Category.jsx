import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryCard from './CategoryCard'
import { useRouter } from 'expo-router'
import { push } from 'firebase/database'

const Category = ({explore=false,flat,design,onCategorySelect}) => {
  const [categoryList, setCategoryList] = useState([]);
  const router = useRouter();

    useEffect(() => {
        getCategoryList()
    }, [])

    const getCategoryList = async () => {
        setCategoryList([])
        const q = query(collection(db,'category'));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            setCategoryList(prev => [...prev, doc.data()])
        })
  }
  const onCategoryPressHandler = (item) => {
    if (!explore) {
      router.push('/businesslist/'+item.name)
    } else {
      onCategorySelect(item.name)
    }
  }
  return (
    <View className={` ${design}`}>
    {!explore&& <View className={`pl-5 flex-row justify-between items-center mt-5`} >
      <Text className='font-psemibold text-lg'>Category</Text>
      <Text className='font-pmedium text-primary text-base mr-5'>View All</Text>
    </View>}
    <FlatList
        data={categoryList}
        className={`ml-5 ${flat}`} 
        showsHorizontalScrollIndicator={false}
        horizontal={true}
            renderItem={({ item, index }) => (
                <CategoryCard category={item} key={index} onCategoryPress={(category)=>onCategoryPressHandler(item)} />
        )}
    />
    </View>
  )
}

export default Category