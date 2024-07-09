import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useUser } from "../../context/userContext";
import http from '../../utils/http';
import SummaryItem from '../../components/SummaryComponent';
import { capitalizeFirstLetter } from '../../utils/formatter';
import { router } from "expo-router";

const Home = () => {
  const session = useUser();

  const [entries, setEntries] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchEntryData = async () => {
      try {
        const response = await http.get('/journals?page=1&perPage=4');
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

    fetchEntryData();
    fetchSummaryData();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-blue-100">
      <View className="p-6">
        <Text className="text-3xl font-bold text-gray-800">Hello, {session.user.user_metadata.username}</Text>
        <Text className="text-lg text-gray-700">Welcome Back to your Journal</Text>
      </View>
      {loadingSummary ? <Text className="text-center text-gray-600 mt-4">Loading...</Text> : (
        <View className="bg-white p-5 mx-5 rounded-lg shadow-md">
          <Text className="text-xl font-bold mb-4 text-gray-500">Last 7 days</Text>
          <View className="flex-row justify-between">
            <SummaryItem label="Most Used Category" value={capitalizeFirstLetter(summary.mostUsedCategory)} />
            <SummaryItem label="Entries" value={summary.numberOfEntries} />
          </View>
          <View className="flex-row justify-between">
            <SummaryItem label="Avg Entries/Day" value={summary.averageEntriesPerDay} />
            <SummaryItem label="Avg Words/Entry" value={summary.averageWordsPerEntry} />
          </View>
        </View>
      )}
      <View className="bg-white p-5 m-5 rounded-lg shadow-md">
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
              <View className="mb-5">
                <Text className="text-xl font-bold text-gray-800">{item.title}</Text>
                <Text className="text-base text-gray-600">{item.content}</Text>
              </View>
            )}
            keyExtractor={(item) => item.entry_id}
            ListHeaderComponent={<Text className="text-2xl font-bold text-gray-600 mb-4">Latest Entries</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;
