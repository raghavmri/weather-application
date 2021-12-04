import React, { Component } from 'react';
import axios from 'axios';
import { Box, Flex, VStack, Text, HStack, Image, useToast } from '@chakra-ui/react';
import { HiLocationMarker } from 'react-icons/hi';
import Searchbar from './Searchbox';

const WeatherComponent = () => {
	// States
	const [weatherData, setWeatherData] = React.useState({
		temp: 0,
		lat: 0,
		long: 0,
		min: null,
		max: null,
		des: 0,
		city: 0,
		country: 0,
		icon: null,
	});
	const toast = useToast();

	function parseWeather(data) {
		// console.log(data);
		const newData = {
			...weatherData,
			temp: Math.floor(data.main.temp - 273) + '',
			des: data.weather[0].description,
			city: data.name,
			country: data.sys.country,
			icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
			max: Math.floor(data.main.temp_max - 273),
			min: Math.floor(data.main.temp_min - 273),
			// lat: position.coords.latitude,
			// long: position.coords.longitude,
		};
		// console.log(newData);
		setWeatherData(newData);
	}
	function getWeather() {
		navigator.geolocation.getCurrentPosition(async function (position) {
			try {
				// console.log('Latitude is :', position.coords.latitude);
				// console.log('Longitude is :', position.coords.longitude);
				const res = await axios.get('/api/weather', {
					params: {
						lat: position.coords.latitude,
						lon: position.coords.longitude,
					},
				});
				const data = res.data;
				parseWeather(data);
			} catch (err) {
				toast({
					title: 'Error',
					description: 'Please check your internet connection',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		});
	}

	React.useEffect(() => {
		getWeather();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Box
			my={8}
			w={'50%'}
			maxW={500}
			border='1px'
			borderColor='gray.200'
			p={4}
			borderRadius={8}
		>
			<Flex direction={'column'} justifyContent={'center'} alignItems='center'>
				<Searchbar
					onClick={async (e) => {
						try {
							// console.log(e);
							const res = await axios.get('/api/weather', {
								params: {
									city: e,
								},
							});
							const data = res.data;
							parseWeather(data);
						} catch (err) {
							toast({
								title: 'Error',
								description: 'Please enter a valid city name',
								status: 'error',
								duration: 5000,
								isClosable: true,
							});
						}
					}}
				/>
				<Text fontSize='xl'>
					<HStack>
						<HiLocationMarker />
						<Text>
							{weatherData.city}, {weatherData.country}
						</Text>
					</HStack>
				</Text>
				{weatherData.icon != null && (
					<Image
						alt={'weather-icon'}
						boxSize='150px'
						// width={150}
						// height={150}
						src={weatherData.icon}
					/>
				)}
				<Box>
					<VStack>
						<Text fontWeight={900} fontSize='2xl'>
							{weatherData.temp}°C
						</Text>
						<Text fontSize='xl'>{weatherData.des}</Text>
						<Text fontSize='xl'>Max - {weatherData.max}°C</Text>
						<Text fontSize='xl'>Min - {weatherData.min}°C</Text>
					</VStack>
				</Box>
			</Flex>
		</Box>
	);
};
export default WeatherComponent;
