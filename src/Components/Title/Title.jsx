import React from 'react';
import { Heading } from './Title.styled';

const Title = ({ title, children }) => {
	return (
		<>
			<Heading>{title}</Heading>
			{children}
		</>
	);
};

export default Title;
