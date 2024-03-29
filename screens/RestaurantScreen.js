import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity';
import { Feather } from "@expo/vector-icons";
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { params: { id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat } } = useRoute();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        dispatch(setRestaurant({
            id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat
        }))
    }, [dispatch])
    return (
        <>
            <BasketIcon />
            <ScrollView>
                <View className="relative">
                    <Image source={{ uri: urlFor(imgUrl).url(), }} className="w-full h-56 bg-gray-300 p-4" />
                    <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
                        <Feather name="arrow-left" size={30} color="#fe3448" />
                    </TouchableOpacity>
                </View>
                <View className="bg-white">
                    <View className="px-4 pt-4">
                        <Text className="text-3xl font-bold">{title}</Text>
                        <View className="flex-row space-x-2 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Feather name="star" size={20} color="#fe3448" opacity={0.5} />
                                <Text className="text-gray-500 text-xs">
                                    <Text className="text-gray-700">{rating}</Text> . {genre}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-1">
                                <Feather name="map-pin" size={18} color="#fe3448" opacity={0.5} />
                                <Text className="text-xs text-gray-500">Nearby . {address}</Text>
                            </View>
                        </View>
                        <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
                    </View>
                    <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                        <Feather name="help-circle" size={20} color="gray" opacity={0.5} />
                        <Text className="font-bold  text-md pl-2 flex-1">Have a food alergy?</Text>
                        <Feather name="chevron-right" size={20} color="gray" opacity={0.5} />
                    </TouchableOpacity>
                </View>
                <View className="pb-36">
                    <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
                    {dishes.map(dish => (
                        <DishRow
                            key={dish._id}
                            id={dish._id}
                            name={dish.name}
                            description={dish.shortDescription}
                            price={dish.price}
                            image={dish.image}
                        />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantScreen