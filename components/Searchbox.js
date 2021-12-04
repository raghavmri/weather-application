import {
	Box,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	InputGroup,
	InputRightElement,
	IconButton,
	Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';

export default function Searchbar(props) {
	const { onClick } = props;
	const inputRef = React.useRef();
	return (
		<>
			<Box>
				<FormControl id='text'>
					<FormLabel>Search any place</FormLabel>
					<InputGroup size='md'>
						<Input
							ref={inputRef}
							pr='4.5rem'
							type={'text'}
							placeholder='San Francisco, CA'
						/>
						<InputRightElement width='4.5rem'>
							<IconButton
								icon={<Icon as={FaLocationArrow} />}
								h='1.75rem'
								size='sm'
								onClick={() => {
									const val = inputRef.current.value;
									// console.log(val);
									onClick(val);
								}}
							/>
						</InputRightElement>
					</InputGroup>

					{/* <FormHelperText>We'll never share your email.</FormHelperText> */}
				</FormControl>
			</Box>
			{/* <Search
				placeholder='Search for a Place'
				onSearch={(value) => console.log(value)}
				style={{ width: 200 }}
				onPressEnter={(e) => {
					console.log(e);
				}}
			/> */}

			<br />
		</>
	);
}
