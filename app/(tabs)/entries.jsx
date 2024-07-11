import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from "../../context/userContext";
import http from '../../utils/http';
import { formatCardText, formatDate } from '../../utils/formatter';
import { useRouter, useFocusEffect } from "expo-router";
import { icons } from '../../constants';

const Entries = () => {
    const session = useUser();
    const router = useRouter();

    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const fetchEntryData = async (pageNumber = 1, isFetchingMore = false) => {
        try {
            const response = await http.get(`/journals?page=${pageNumber}&perPage=10`);
            const newEntries = response.data;
            setTotalItems(response.totalItems);

            if (isFetchingMore) {
                setEntries(prevEntries => [...prevEntries, ...newEntries]);
                setIsFetchingMore(false);
            } else {
                setEntries(newEntries);
            }
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEntryData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchEntryData();
        }, [])
    );

    const handleLoadMore = () => {
        if (isFetchingMore || entries.length >= totalItems) return;
        setIsFetchingMore(true);
        setPage(prevPage => {
            const nextPage = prevPage + 1;
            fetchEntryData(nextPage, true);
            return nextPage;
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-blue-100">
            <View className="bg-white p-5 m-5 rounded-lg shadow-md h-full">
                <View>
                    <Text className="text-xl font-bold text-gray-600 mb-4">Your Journal Entries</Text>
                </View>
                <View className="flex-row my-2">
                    <View className="flex-1 h-1 bg-black" />
                </View>
                {loading ? (
                    <Text className="text-center text-gray-600 mt-4">Loading...</Text>
                ) : (
                    <FlatList
                        data={entries}
                        ListEmptyComponent={() => (
                            <TouchableOpacity
                                onPress={() => {
                                    router.push("/create");
                                }}
                                className="bg-secondary py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center"
                            >
                                <Text className="text-white text-center font-psemibold">Create An Entry</Text>
                            </TouchableOpacity>
                        )}
                        renderItem={({ item }) => (
                            <View className="mb-5 bg-black-200 rounded-lg px-4 py-2">
                                <View className="flex-row justify-between">
                                    <Text className="text-lg font-bold text-gray-200">{item.title}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            router.push({ pathname: "/create", params: { entryId: item.entry_id } });
                                        }}>
                                        <Image className="rounded-full w-5 h-5" source={icons.dots} style={{ tintColor: 'white' }} />
                                    </TouchableOpacity>

                                </View>
                                <Text className="text-base text-gray-300">{formatCardText(item.content)}</Text>
                                <Text className="text-sm text-gray-400 text-right">{formatDate(item.created_at)}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.entry_id}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isFetchingMore && <Text className="text-center text-gray-600 mt-4">Loading more...</Text>}
                    />
                )}
            </View>
        </SafeAreaView>
    );
};

export default Entries;
