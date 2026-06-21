import { render } from '@testing-library/react';
import App from './App';

jest.mock('./components/Dashboard', () => () => <div data-testid="dashboard">Dashboard</div>);
jest.mock('./components/firebase', () => ({
  auth: {},
  provider: {},
  db: {},
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  signInWithPopup: jest.fn(),
  onAuthStateChanged: jest.fn(),
  publishCharacter: jest.fn(),
  getPublicCharacter: jest.fn(),
}));

test('renders without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
