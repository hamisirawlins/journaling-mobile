import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import http from '../../utils/http'
import { router } from 'expo-router'

const CreateEntry = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: ''
  })

  const createEntry = async () => {
    if (!form.title || !form.content || !form.category) {
      alert('Please fill in all fields')
      return
    }
    setIsLoading(true)

    try {
      await http.post('/journals/', {
        title: form.title,
        content: form.content,
        category: form.category
      });
      setIsLoading(false)
      setForm({
        title: '',
        content: '',
        category: ''
      })
      alert('Entry Created Successfully')
      router.replace("/home")
    } catch (err) {
      console.error('Failed to create entry:', err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-700">Add a Journal Entry</Text>
        <ScrollView className="px-2">
          <View className="py-5">
            <View className="border-2 border-white bg-black-200 w-full h-16 px-4 rounded-2xl focus:border-black-200 items-center flex-row">
              <TextInput
                className="flex-1 font-medium text-base text-white"
                value={form.title}
                placeholder="A Short Title"
                placeholderTextColor="#FFFFFF"
                onChangeText={(text) => setForm({ ...form, title: text })}
              />
            </View>
          </View>
          <View className="py-5">
            <View className="border-2 border-white bg-black-200 w-full px-4 rounded-2xl focus:border-black-200 items-center flex-row">
              <TextInput
                className="flex-1 font-medium text-base text-white"
                value={form.content}
                placeholder="Capture Your Thoughts..."
                placeholderTextColor="#FFFFFF"
                multiline
                style={{
                  textAlignVertical: 'top',
                  paddingVertical: 8,
                  minHeight: 120,
                  maxHeight: 300,
                }}
                onChangeText={(text) => setForm({ ...form, content: text })}
              />
            </View>
          </View>
          <View className="py-5">
            <View className="border-2 border-white bg-black-200 w-full h-16 px-4 rounded-2xl focus:border-black-200 items-center flex-row">
              <TextInput
                className="flex-1 font-medium text-base text-white"
                value={form.category}
                placeholder="Tag A Category"
                placeholderTextColor="#FFFFFF"
                onChangeText={(text) => setForm({ ...form, category: text })}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={createEntry}
            className="bg-secondary py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
            disabled={isLoading}
          >
            <Text className="text-white text-center font-psemibold">Save Entry</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default CreateEntry