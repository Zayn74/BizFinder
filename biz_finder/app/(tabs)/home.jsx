import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import BusinessList from '../../components/Home/BusinessList'

const home = () => {
  
  return (
        <ScrollView >
          <Header/>
          <Slider/>
          <Category/>
          <BusinessList />
          <StatusBar backgroundColor="transparent"/>
        </ScrollView>
  )
}

export default home