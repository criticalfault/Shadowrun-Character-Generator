import { render } from '@testing-library/react';
import App from './App';

// Mock the Dashboard component
jest.mock('./components/Dashboard', () => () => <div data-testid="dashboard">Dashboard</div>);

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
