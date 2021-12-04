import { Center, IconButton, Box, useColorMode, Icon } from '@chakra-ui/react';
import Weather from '../components/Weather';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
export default function Home() {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<>
			<Box p={4}>
				<IconButton
					onClick={toggleColorMode}
					icon={<Icon as={colorMode === 'light' ? BsSunFill : BsFillMoonFill} />}
				/>
			</Box>
			<Center>
				<Weather />
			</Center>
		</>
	);
}
