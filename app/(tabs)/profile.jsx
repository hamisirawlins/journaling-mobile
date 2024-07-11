import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useUser } from "../../context/userContext";
import AuthButton from '../../components/AuthButton';
import supabase from '../../supabase';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';

const Profile = () => {
  const session = useUser();

  const [loading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    alert('See You Soon!');
    await supabase.auth.signOut();
    setIsLoading(false);
  }

  const handleRequestPasswordReset = async () => {
    setIsLoading(true);
    await supabase.auth.resetPasswordForEmail(session.user.email);
    setIsLoading(false);
    alert('Password Reset Email Requested, please check your email.');
  }

  const handleUpdateUsername = async () => {
    console.log("Update Username")
  }

  const handleEULACheck = async () => {
    console.log("EULA Check")
  }

  return (
    <SafeAreaView><View>
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">{session.user.user_metadata.username}</Text>
        <Text className="text-lg text-gray-700">Account Management</Text>
      </View>
      <View className="flex-row px-4">
        <View className="flex-1 h-1 bg-black" />
      </View>
      <AuthButton handlePress={handleUpdateUsername} title="Update Username" containerStyles="mx-4" />
      <AuthButton handlePress={handleEULACheck} title="Account Terms and Conditions" containerStyles="mx-4" />
      <AuthButton handlePress={handleRequestPasswordReset} isLoading={loading} title="Request Password Reset" containerStyles="mx-4" />
      <AuthButton handlePress={handleSignOut} isLoading={loading} title="Sign Out" containerStyles="mx-4" />
    </View></SafeAreaView>

  )
}

export default Profile