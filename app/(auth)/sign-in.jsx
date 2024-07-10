import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import AuthButton from '../../components/AuthButton'
import { Link, router } from 'expo-router'
import supabase from '../../supabase'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      alert('Please fill in all fields')
      return
    }
    setIsLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    })

    if (error) {
      alert(error.message)
      setIsLoading(false)
    }
    else {
      setIsLoading(false)
      alert('Sign In Successful')
      router.replace("/home")
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh]  px-4 my-6">
          <View className="flex-row justify-center">
            <Image className="rounded-full w-48 h-48" source={images.protection} />
          </View>
          <Text className="text-2xl text-black font-pregular text-center py-4 mt-10">Log In To Your Journal</Text>
          <FormField
            title="Email"
            placeholder="Email Address"
            keyboardType="email-address"
            value={form.email}
            handleChange={(value) => setForm({ ...form, email: value })}
            otherStyles="mt-5"
          />
          <FormField
            title="Password"
            placeholder="Password"
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-5"
          />
          <AuthButton title="Sign  In" handlePress={handleSignIn} containerStyles="mt-7 h-12"
            isLoading={isLoading}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-500 font-pregular">Don't Have An Account?</Text>
            <Link href="/sign-up" className='font-pregular text-orange-500'>Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn