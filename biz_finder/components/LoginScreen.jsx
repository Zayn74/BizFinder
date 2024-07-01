import { View, Text, SafeAreaView, ScrollView, Image, StatusBar } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton';
import  * as WebBrowser  from 'expo-web-browser';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';
import { useOAuth } from "@clerk/clerk-expo";


WebBrowser.maybeCompleteAuthSession();
const LoginScreen = () => {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } =
          await startOAuthFlow();
  
        if (createdSessionId) {
          setActive({ session: createdSessionId });
        } else {
          // Use signIn or signUp for next steps such as MFA
        }
      } catch (err) {
        console.error("OAuth error", err);
      }
    }, []);
  return (
    <SafeAreaView className=" mt-7 w-full h-full">
      <ScrollView>
        <View className="flex items-center mt-[100px]">
          <Image
            style={{
              borderRadius: 20,
              borderColor: "#000",
              borderWidth: 6,
            }}
            source={require("../assets/images/login.png")}
            className="w-[220px] h-[450px]  "
          />
        </View>

        <View className="bg-white p-10 -mt-6">
          <Text className="text-2xl font-pextrabold">
            Your Ultimate{" "}
            <Text className="text-primary">Community Business Directory</Text>{" "}
            App
          </Text>
          <Text className='font-pregular text-base text-gray-400 text-center mt-4'>Find The Nearest Bussines From Your Location and Add Your Business To!</Text>
        <CustomButton
        handlePress={onPress}
        title='Lets Start!'
        textStyles='text-white'
        containerStyle='mt-5'
        />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </SafeAreaView>
  );
}

export default LoginScreen