import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useUser } from "../../context/userContext";
import AuthButton from '../../components/AuthButton';
import supabase from '../../supabase';

const Profile = () => {
  const session = useUser();

  const handleSignOut = async () => {
    alert('Sign Out Processing...');
    await supabase.auth.signOut();
  }

  const handleRequestPasswordReset = async () => {
    await supabase.auth.api.resetPasswordForEmail(session.user.email);
    alert('Password Reset Email Requested, please check your email.');
  }

  return (
    <SafeAreaView><View>
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">{session.user.user_metadata.username}</Text>
        <Text className="text-lg text-gray-700">Account Management</Text>
      </View>
      <AuthButton handlePress={""} title="Update Username" containerStyles="mx-4" />
      <AuthButton handlePress={""} title="Account Terms and Conditions" containerStyles="mx-4" />
      <AuthButton handlePress={handleRequestPasswordReset} title="Request Password Reset" containerStyles="mx-4" />
      <AuthButton handlePress={handleSignOut} title="Sign Out" containerStyles="mx-4" />
    </View></SafeAreaView>

  )
}

export default Profile