import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, containerStyle, textStyles, isLoading})=>{
    return (
      <TouchableOpacity
        className={`bg-primary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading?"opacity-50":""}`} 
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
      >
            <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
      </TouchableOpacity>
    );
}

export default CustomButton