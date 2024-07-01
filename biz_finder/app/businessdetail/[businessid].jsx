import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Intro from '../../components/BusinessDetail/Intro'
import ActionButton from '../../components/BusinessDetail/ActionButton'
import AboutSection from '../../components/BusinessDetail/AboutSection'
import Reviews from '../../components/BusinessDetail/Reviews'
import { Ionicons } from '@expo/vector-icons';

const BusinessDetail = () => {
    const [business, setBusiness] = useState()
    const [loading, setLoading] = useState(false)

    const { businessid } = useLocalSearchParams()
    useEffect(() => {
        GetBusinessDetailById()
    }, [])
    

    const GetBusinessDetailById = async () => {
        setLoading(true)
        const docRef = doc(db,'business', businessid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setBusiness({id:docSnap.id,...docSnap.data()})
            setLoading(false)
        } else {
            console.log('no Data');
            setLoading(false)
        }
    }
    const router=useRouter()
    return (
      <View>
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          className="mt-[80%]"
          color={"#7F57F1"}
        />
      ) : (
        <View className=''>
          <Intro business={business} />
          <ActionButton business={business}/>
          <AboutSection business={business}/>
          <Reviews business={business}/>
        </View>
      )}
            </ScrollView>
            <View className='absolute z-10 flex-row justify-between w-full p-5'>
            <TouchableOpacity onPress={()=> router.back()}  className='mt-6 fixed'>
                <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default BusinessDetail