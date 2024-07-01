import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

const ExploreBusinessList = ({businessList}) => {
  return (
    <ScrollView  className='pb-10 mt-4' showsVerticalScrollIndicator={false}>
          {businessList.map((item,index)=>(
          <View key={index}>
            <BusinessListCard business={item}/>
          </View>
      ))}
      <View style={{height:300}}></View>
    </ScrollView>
  )
}

export default ExploreBusinessList