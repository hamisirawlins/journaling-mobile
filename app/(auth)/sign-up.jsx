import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import AuthButton from '../../components/AuthButton'
import { Link, router } from 'expo-router'
import supabase from '../../supabase'

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = () => {
    if (!form.email || !form.password || !form.username) {
      alert('Please fill in all fields')
      return
    }
    setIsLoading(true)

    const { data, error } = supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          username: form.username,
        },
      },
    })

    if (error) {
      alert(error.message)
      setIsLoading(false)
    }
    else {
      setIsLoggedIn(true)
      alert('Please check your inbox for email verification!')
      router.push("/sign-in")
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh]  px-4 my-6">
          <View className="flex-row justify-center">
            <Image className="rounded-full w-48 h-48" source={images.protection} />
          </View>
          <Text className="text-2xl text-black font-pregular text-center py-4 mt-6">Sign Up To Journal</Text>
          <FormField
            title="Username"
            placeholder="Username"
            value={form.username}
            handleChange={(value) => setForm({ ...form, username: value })}
            otherStyles="mt-5"
          />
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
          <AuthButton title="Sign  Up" handlePress={handleSignUp} containerStyles="mt-7 h-12"
            isLoading={isLoading}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-500 font-pregular">Already Have An Account?</Text>
            <Link href="/sign-in" className='font-pregular text-orange-500'>Sign In</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp