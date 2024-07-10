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

  return (
    <SafeAreaView><View>
      <Text>{session.user.email}</Text>
      <Text>{session.user.user_metadata.username}</Text>
      <AuthButton handlePress={handleSignOut} title="Sign Out" containerStyles="mx-4" />
    </View></SafeAreaView>

  )
}

export default Profile