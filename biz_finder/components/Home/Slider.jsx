import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'

const Slider = () => {
const [SliderList, setSliderList] = useState([])

useEffect(() => {
    getSliderList()
}, [])


    const getSliderList = async () => {
        setSliderList([])
        const q = query(collection(db, 'sliders'))
        const querySnapshot = await getDocs(q)
        
        querySnapshot.forEach((doc) => {
            setSliderList(prev=>[...prev,doc.data()])
        })
    }
  return (
    <View>
      <Text className='font-psemibold text-lg pl-5 pt-5 mb-2'>#Special for you</Text>
      <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className='pl-5'
      data={SliderList}
      renderItem={({item,index})=>(
        <Image
        source={{uri:item.imageUrl}}
        className='w-[300px] h-[160px] rounded-2xl mr-4'
        />
      )}
      />
    </View>
  )
}

export default Slider