import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants'

const TabIcon = ({ icon, color }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6"
            />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,

                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon icon={icons.home} color={color} name="home" focused={focused} />
                        }
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon icon={icons.plus} color={color} name="create" focused={focused} />
                        }
                    }}
                />
                                <Tabs.Screen
                    name="entries"
                    options={{
                        title: 'Entries', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon icon={icons.news} color={color} name="entries" focused={focused} />
                        }
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile', headerShown: false,
                        tabBarIcon: ({ color, focused }) => {
                            return <TabIcon icon={icons.user} color={color} name="Profile" focused={focused} />
                        }
                    }}
                />
            </Tabs>
        </>
    )
}

export default TabsLayout