import { View, Text, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useUser } from "../../context/userContext";
import http from '../../utils/http';

const Home = () => {
  const session = useUser();

  const [entries, setEntries] = useState(null);
  const [summary, setSummary] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntryData = async () => {
      try {
        const response = await http.get('/journals/');
        setEntries(response.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    //get summary data
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
        setLoading(false);
      }
    };

    fetchEntryData();
    fetchSummaryData();
  }, []);


  return (
    <SafeAreaView>
      <View>
        <Text>Welcome, {session.user.email}</Text>
        {loading ? <Text>Loading...</Text> : (
          <FlatList
            data={entries}
            renderItem={({ item }) => (
              <View>
                <Text>{item.title}</Text>
                <Text>{item.body}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={<Text>Your Latest Entries</Text>}
          />
        )}
        {loading ? <Text>Loading...</Text> : (
          <View>
            <Text>Summary</Text>
            <Text>{summary.numberOfEntries}</Text>
            <Text>{summary.mostUsedCategory}</Text>
            <Text>{summary.averageEntriesPerDay}</Text>
            <Text>{summary.averageWordsPerEntry}</Text>
          </View>
        )}
      </View></SafeAreaView>
  )
}

export default Home