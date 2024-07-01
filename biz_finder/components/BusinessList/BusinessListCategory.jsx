import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'


const BusinessListCategory = ({business}) => {
  const router= useRouter()
  return (
    <TouchableOpacity
      onPress={() => router.push("/businessdetail/" + business.id)}
      className="m-3 p-3 rounded-2xl bg-white flex-row"
    >
      <Image
        source={{ uri: business?.imageUrl }}
        className="w-[120px] h-[120px] rounded-2xl"
      />
      <View className="ml-2 ">
        <Text className="font-psemibold">{business.name}</Text>
        <Text className="font-pmedium flex-1 text-gray-400">
          {business.address}
        </Text>
        <View className=" flex-row ">
          <Image
            source={require("./../../assets/images/star.png")}
            className="w-[15px] h-[15px]"
          />
          <Text className=" font-plight ml-1 text-gray-400">
            {business.rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default BusinessListCategory