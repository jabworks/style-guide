import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-react';

import { Button } from './button';

test('counter button increments the count', async () => {
	const screen = await render(<Button defaultCount={1} />);

	await screen.getByRole('button', { name: /count: 1/i }).click();

	await expect.element(screen.getByText(/count: 2/i)).toBeVisible();
});

describe('Button component', () => {
	test('renders with default count', async () => {
		const { getByRole } = await render(<Button defaultCount={1} />);
		const button = getByRole('button', { name: /count: 1/i });

		expect(button).toBeInTheDocument();
	});

	test('increments count on click', async () => {
		const { getByRole } = await render(<Button defaultCount={1} />);
		const button = getByRole('button', { name: /count: 1/i });

		await button.click();
		expect(getByRole('button', { name: /count: 2/i })).toBeInTheDocument();
	});
});
