import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import http from '../../utils/http';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { icons } from '../../constants';

const CreateEntry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { entryId } = useLocalSearchParams();

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: ''
  });

  useEffect(() => {
    const fetchEntry = async () => {
      if (entryId) {
        try {
          const response = await http.get(`/journals/${entryId}`);
          setForm({
            title: response.title,
            content: response.content,
            category: response.category
          });
        } catch (err) {
          console.error('Failed to fetch entry:', err);
        }
      }
    };
    fetchEntry();

    return () => {
      setForm({
        title: '',
        content: '',
        category: ''
      });
    };
  }, [entryId]);

  const handleSubmit = async () => {
    if (!form.title || !form.content || !form.category) {
      alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);

    try {
      if (entryId) {
        // Update entry
        await http.put(`/journals/${entryId}`, {
          title: form.title,
          content: form.content,
          category: form.category
        });
        alert('Entry Updated Successfully');
      } else {
        // Create new entry
        await http.post('/journals/', {
          title: form.title,
          content: form.content,
          category: form.category
        });
        alert('Entry Created Successfully');
      }
      setIsLoading(false);
      setForm({
        title: '',
        content: '',
        category: ''
      });
      router.replace("/home");
    } catch (err) {
      console.error('Failed to submit entry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async () => {
    setIsLoading(true);
    try {
      await http.delete(`/journals/${entryId}`);
      alert('Entry Deleted Successfully');
      router.replace("/home");
    } catch (err) {
      console.error('Failed to delete entry:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="p-6">
        <View className="flex-row justify-between">
          <Text className="text-3xl font-bold text-gray-700">{entryId ? 'Edit' : 'Add'} Journal Entry</Text>
          {entryId && (
            <TouchableOpacity
              onPress={deleteEntry}
              className="py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
              disabled={isLoading}
            >
              <Image className="rounded-xl w-8 h-8" source={icons.dustbin} style={{ tintColor: 'red' }} />
            </TouchableOpacity>

          )}

        </View>

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
            onPress={handleSubmit}
            className="bg-green-400 py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
            disabled={isLoading}
          >
            <Text className="text-white text-center font-psemibold">{entryId ? 'Update' : 'Save'} Entry</Text>
          </TouchableOpacity>
          {entryId && (
            <TouchableOpacity
              onPress={() => {
                setForm({
                  title: '',
                  content: '',
                  category: ''
                });
                router.replace("/create");
              }}
              className="bg-gray-300 py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
              disabled={isLoading}
            >
              <Text className="text-black text-center font-psemibold">Cancel Edit</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateEntry;
