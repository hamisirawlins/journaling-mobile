import { View, TextInput, StyleSheet } from 'react-native';
import React from 'react';

export default function TextFormItem({ placeholder, value, handleChange, paragraph = false }) {
  return (
    <View className="py-5">
      <View className="border-2 border-white bg-black-200 w-full px-4 rounded-2xl focus:border-black-200 items-center flex-row">
        <TextInput
          className="flex-1 font-medium text-base text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#FFFFFF"
          onChangeText={handleChange}
          multiline
          style={[styles.input, paragraph && styles.paragraph]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'top',
    paddingVertical: 8,
  },
  paragraph: {
    maxHeight: 100,
  },
});
