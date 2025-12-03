'use client';

import { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	defaultCount: number;
}

export const Button = ({ className, defaultCount, ...props }: ButtonProps) => {
	const [count, setCount] = useState(defaultCount);

	const handleClick = () => {
		setCount(prevCount => prevCount + 1);
	};

	return (
		<button
			className={`rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 ${className ?? ''}`}
			type='button'
			onClick={handleClick}
			{...props}
		>
			Count: {count}
		</button>
	);
};
