import { View, Text, Image, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { query } from 'firebase/database';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from './../../config/FirebaseConfig'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

const addBusiness = () => {
  const navigation = useNavigation()
  const [image, setImage] = useState(null)
  const [categoryList, setCategoryList] = useState([])
  const [name, setName] = useState([])
  const [address, setAddress] = useState([])
  const [contact, setContact] = useState([])
  const [website, setWebsite] = useState([])
  const [about, setAbout] = useState([])
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  
  const { user } = useUser();
  
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add new Business',
      headerShown: true
    })
    GetCategoryList()
  }, [])

  const onImagePress=async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri)
    console.log(result);
  }
  const onAdddNewBusiness = async () => {
    setLoading(true)
    const fileName = Date.now().toString()+'.jpg'
    const resp = await fetch(image) 
    const blob = await resp.blob()
    const imageRef = ref(storage, 'bizFinderData/' + fileName)

    uploadBytes(imageRef, blob).then((snapshot) => {
      console.log('gile zeft');
    }).then(resp => {
      getDownloadURL(imageRef).then(async (downloadUrl) => {
        console.log(downloadUrl);

        saveBusinessDetails(downloadUrl)
      })
    })
    setLoading(false)
  }

  const saveBusinessDetails =async (imageUrl) => {
    await setDoc(doc(db, 'business', Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      useremail: user?.primaryEmailAddress.emailAddress,
      userimage: user?.imageUrl,
      imageUrl:imageUrl
    })
    setLoading(false)
    ToastAndroid.show('Your Business Added',ToastAndroid.LONG)
  }

  const GetCategoryList = async () => {
    setCategoryList([])
    const q = query(collection(db,'category'))
    const snapShot = await getDocs(q)
    
    snapShot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList(prev => [...prev, {
        label:(doc.data()).name,
        value:(doc.data()).name,
      }])
  })
  }

  return (
    <View className="p-5 bg-white h-full">
      <Text className="font-pbold text-2xl">Add Business</Text>
      <Text className="font-pregular text-gray-500">
        Fill all Details To Add Your Business
      </Text>
      <TouchableOpacity
        className="my-5 w-[100px]"
        activeOpacity={0.6}
        onPress={() => onImagePress()}
      >
        {!image ? (
          <Image
            source={require("./../../assets/images/camera.png")}
            className="w-[100px] h-[100px]"
          />
        ) : (
          <Image
            source={{ uri: image }}
            className="w-[100px] h-[100px] rounded-2xl"
          />
        )}
      </TouchableOpacity>
      <View>
        <TextInput
          onChangeText={v => setName(v)}
          placeholder="Business Name"
          className="p-3 border font-pregular border-primary rounded-md my-3"
        />
        <TextInput
          onChangeText={v => setAddress(v)}
          placeholder="Address"
          className="p-3 border font-pregular border-primary rounded-md my-3"
        />
        <TextInput
          onChangeText={v => setContact(v)}
          placeholder="Contact"
          className="p-3 border font-pregular border-primary rounded-md my-3"
        />
        <TextInput
          onChangeText={v => setWebsite(v)}
          placeholder="Business Website"
          className="p-3 border font-pregular border-primary rounded-md my-3"
        />
        <View className="border font-pregular border-primary rounded-md my-3">
          <RNPickerSelect
            onValueChange={(value)=> setCategory(value)}
            items={categoryList}
          />
        </View>
        <TextInput
          onChangeText={v => setAbout(v)}
          multiline
          numberOfLines={2}
          placeholder="About"
          className="h-[100px] p-3 border font-pregular border-primary rounded-md my-3"
        />
      </View>
      <TouchableOpacity
        disabled={loading}
        onPress={() => onAdddNewBusiness()}
        className="p-4 rounded-md bg-primary"
      >
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text className="text-white text-center font-pregular">
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

export default addBusiness