import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const AuthButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            className={`bg-secondary py-3 px-5 rounded-xl mt-5 min-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            style={containerStyles}
            disabled={isLoading}
        >
            <Text className={`text-white text-center font-psemibold ${textStyles}`}>{title}</Text>
        </TouchableOpacity>
    )
}

export default AuthButton