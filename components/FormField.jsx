import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

export default function FormField({ title, placeholder, keyboardType, value, handleChange, otherStyles }) {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-grey-100 font-pmedium">{title}</Text>
            <View className="border-2 border-orange-400 w-full h-16 px-4 rounded-2xl focus:border-black-200 items-center flex-row">
                <TextInput
                    className="flex-1 font-medium text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#A1A1A1"
                    keyboardType={keyboardType}
                    onChangeText={handleChange}
                    secureTextEntry={title === 'Password' && !showPassword}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image source={showPassword ? icons.hidden : icons.eye} className="w-6 h-6" resizeMode='contain' />
                    </TouchableOpacity>
                )
                }
            </View>
        </View>
    )
}