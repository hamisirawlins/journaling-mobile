import React from 'react';
import { View, Text } from 'react-native';

const SummaryItem = ({ label, value }) => {
  return (
    <View className="flex-col mb-2">
      <Text className="text-lg text-right text-gray-800">{label}:</Text>
      <Text className="text-4xl text-right font-bold text-blue-300">{value}</Text>
    </View>
  );
};

export default SummaryItem;
