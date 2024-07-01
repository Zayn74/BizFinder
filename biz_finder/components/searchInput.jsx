import { useState } from "react";
import { View,TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery,design}) => {
  const pathname = usePathname()
  const [query, setQuery] = useState(initialQuery||'')

  return (
      <View className={`w-full mb-4 mt-2 h-12 px-4 bg-white rounded-2xl flex-row items-center ${design}  `} >
        <TextInput
          className=" font-pregular flex-1 text-base "
          value={query}
          placeholder='search...'
          placeholderTextColor="black"
          onChangeText={(e)=>setQuery(e)}
        />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert('Error', 'Please search for something else')
          }
          if (pathname.startsWith('/search')) router.setParams({ query })
          else router.push(`/search/${query}`)
      }}
      >
        <Image
        source={require('../assets/images/search.png')}
        className='w-5 h-5'
        resizeMode="contain"
        />
       </TouchableOpacity>
      </View>
  );
};

export default SearchInput;
