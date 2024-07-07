import { View, Image, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import AuthButton from "../components/AuthButton";
import { StatusBar } from "expo-status-bar";
import {  Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import supabase from "../supabase";


export default function App() {
    const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


    if(session && session.user) return <Redirect href="/home" />
    return (
        <SafeAreaView className="h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="items-center justify-center w-full px-4 min-h-[85vh]">
                    <Image
                        source={images.journal}
                        className="h-40"
                        resizeMode="contain"
                    />
                    <View className="relative mt-5">
                        <Text className="text-3xl text-black font-plight text-center py-4">Personal Journaling With</Text>
                        <Text className="text-secondary-200 text-3xl font-plight text-center py-4">Shamiri Health</Text>
                        <AuthButton
                            title="Get Started"
                            handlePress={() => {
                                router.push("/sign-in")
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <StatusBar backgroundColor="#FFFFFF" style="dark" />
        </SafeAreaView>
    );
}