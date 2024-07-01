import { Text, View } from "react-native";
import React from "react";
import { Redirect } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";

export default function Index() {
  return (
   
      <Redirect href={'/home'} />
  );
}
