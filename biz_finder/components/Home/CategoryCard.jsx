import { View, Text, Image, TouchableOpacity } from 'react-native'

const CategoryCard = ({ category,onCategoryPress }) => {
    
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)} className='items-center justify-center mt-2'>
      <View className='p-[15px] bg-gray-200 rounded-full mr-[15px]'>
        <Image source={{ uri: category.icon }} className="h-10 w-10" resizeMode='contain'  />
      </View>
          <Text className='text-xs font-pmedium text-center mt-1 mr-2'>{category.name}</Text>
    </TouchableOpacity>
  );
}

export default CategoryCard