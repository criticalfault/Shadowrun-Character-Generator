import { render } from '@testing-library/react';
import MagicPanel from './MagicPanel';

// Mock props for testing
const mockProps = {
  spells: [],
  powers: [],
  foci: [],
  onChangePowers: jest.fn(),
  onChangeSpells: jest.fn(),
  onChangeFoci: jest.fn(),
  magicalTraditions: ["Full Magician", "Adept", "Aspected Magician"],
  chosenTradition: "Full Magician",
  magicalTotem: null,
  onChangeMagicalTradition: jest.fn(),
  onChangeMagicalTotem: jest.fn(),
  magicalChoice: "Full Magician",
  BooksFilter: ["cc", "mits", "sr3", "mm", "mat", "r3"],
  Edition: "SR3",
  maxSpellPoints: 25,
  onChangeMagicalAttributes: jest.fn(),
};

describe('MagicPanel Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<MagicPanel {...mockProps} />);
    expect(container).toBeTruthy();
  });
});