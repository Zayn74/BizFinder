import { View, Text, TextInput, TouchableOpacity, ToastAndroid, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouter } from 'expo-router'


const Reviews = ({business}) => {
    const [rating, setRating] = useState(4)
    const [userInput, setUserInput] = useState()
    const {user}=useUser()
    const router=useRouter()

  const onDelete = () => {
    Alert.alert('Delete!', 'Do you want to delete your business?', [
      {
        text: 'Cancel',
        style:'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress:()=>deleteBusiness()
      }
    ])
  }
  const deleteBusiness =async () => {
    console.log('Deleteddddd');
    await deleteDoc(doc(db, 'business', business?.id))
    router.back()
    ToastAndroid.show('Business Deleted!',ToastAndroid.LONG)
  }
  
    const onSubmit = async () => {
        const docRef = doc(db,'business', business?.id)
            await updateDoc(docRef, {
                reviews: arrayUnion({
                    ratings: rating,
                    comment: userInput,
                    userName: user?.fullName,
                    userImage: user?.imageUrl,
                    userEmail:user?.primaryEmailAddress?.emailAddress
                })
            })
       
        ToastAndroid.show('Comment Added',ToastAndroid.BOTTOM)
    }
  return (
    <View className="p-4 bg-white ">
      <Text className="font-pbold text-xl">Reviews</Text>

    <View>
        <Rating
          showRating={false}
          imageSize={30}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Give Us Your Review."
          numberOfLines={2}
          onChangeText={(value) => setUserInput(value)}
          className="border p-3 rounded-lg mt-3 border-primary"
        />
        <View className="justify-between flex-row my-4">
          <TouchableOpacity
            onPress={() => onSubmit()}
            disabled={!userInput}
            className="bg-primary hover:bg-violet-500 w-20  font-bold py-3 px-4 rounded-xl"
          >
            <Text className="text-white">Submit</Text>
          </TouchableOpacity>

          {user?.primaryEmailAddress.emailAddress==business?.useremail&&<TouchableOpacity onPress={()=>onDelete()}>
            <View className='flex-row items-center bg-red-600 rounded-xl px-2 py-2' >
              <Text className='font-pregular text-sm text-white'>Delete</Text>
          <MaterialCommunityIcons name="delete-empty-outline" size={35} color="white" />
            </View>
          </TouchableOpacity>}
        </View>
        </View>
    
    <View className='ml-2'>
        {business?.reviews?.map((item, index) => (
            <View key={index} className='border border-x-8 border-gray-300 rounded-3xl flex-row gap-3 mt-2 p-2'>
                <Image source={{ uri: item.userImage }} className='w-10 h-10 rounded-full' />
                <View >
                <Text className='font-pbold text-sm mb-1'>{item.userName}</Text>
                <Text className='font-pregular text-base px-3'>{item.comment}</Text>
                <Rating
                className='mt-1 items-center justify-center'
                imageSize={17}
                ratingCount={item.ratings}
                />
                </View>
            </View>
        ))}
    </View>
    </View>
  );
}

export default Reviews