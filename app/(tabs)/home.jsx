import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from "../../context/userContext";
import http from '../../utils/http';
import SummaryItem from '../../components/SummaryComponent';
import { capitalizeFirstLetter, formatCardText, formatDate } from '../../utils/formatter';
import { router, useFocusEffect } from "expo-router";

const Home = () => {
  const session = useUser();

  const [entries, setEntries] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const fetchEntryData = async () => {
    try {
      const response = await http.get('/journals?page=1&perPage=3');
      setEntries(response.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummaryData = async () => {
    try {
      const endDate = new Date().toISOString();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      const startDateISOString = startDate.toISOString();

      const url = `/summaries?startDate=${encodeURIComponent(startDateISOString)}&endDate=${encodeURIComponent(endDate)}`;

      const response = await http.get(url);
      setSummary(response);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoadingSummary(false);
    }
  };

  useEffect(() => {
    fetchEntryData();
    fetchSummaryData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchSummaryData();
      fetchEntryData();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">Hello, {session.user.user_metadata.username}</Text>
        <Text className="text-lg text-gray-700">Welcome Back to your Journal</Text>
      </View>
      {loadingSummary ? <Text className="text-center text-gray-600 mt-4">Loading...</Text> : (
        <View className="bg-white p-5 mx-5 rounded-lg shadow-md">
          <Text className="text-xl font-bold mb-4 text-gray-500">Last 7 days</Text>
          <View className="flex-row">
            <View className="flex-col px-2">
              <SummaryItem label="Most Used Category" value={capitalizeFirstLetter(summary.mostUsedCategory)} />
              <SummaryItem label="Entries" value={summary.numberOfEntries} />
            </View>
            <View className="flex-col px-4">
              <SummaryItem label="Avg Entries/Day" value={summary.averageEntriesPerDay} />
              <SummaryItem label="Avg Words/Entry" value={summary.averageWordsPerEntry} />
            </View>
          </View>
        </View>
      )}
      <View className="bg-white p-5 m-5 rounded-lg shadow-md">
        <View>
          <Text className="text-xl font-bold text-gray-600 mb-4">Latest Entries</Text>
        </View>
        {loading ? <Text className="text-center text-gray-600 mt-4">Loading...</Text> : (
          <FlatList
            data={entries}
            ListEmptyComponent={() => (
              <TouchableOpacity
                onPress={() => {
                  router.push("/create")
                }}
                className="bg-secondary py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
              >
                <Text className="text-white text-center font-psemibold">Create An Entry</Text>
              </TouchableOpacity>

            )}
            renderItem={({ item }) => (
              <View className="mb-5 bg-black-200 rounded-lg px-4 py-2">
                <Text className="text-lg font-bold text-gray-200">{item.title}</Text>
                <Text className="text-base text-gray-300">{formatCardText(item.content)}</Text>
                <Text className="text-sm text-gray-400 text-right">{formatDate(item.created_at)}</Text>
              </View>
            )}
            keyExtractor={(item) => item.entry_id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
