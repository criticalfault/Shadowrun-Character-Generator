import { render } from '@testing-library/react';
import AttributesPanel from './AttributesPanel';

// Mock character data for testing
const mockCharacter = {
  attributes: {
    Body: 1,
    Quickness: 1,
    Strength: 1,
    Charisma: 1,
    Willpower: 1,
    Intelligence: 1,
    Essence: 6,
    Initative: 1,
    Magic: 6,
  },
  race: 'Human',
  raceBonuses: {
    Body: 0,
    Quickness: 0,
    Strength: 0,
    Charisma: 0,
    Willpower: 0,
    Intelligence: 0,
  },
  cyberAttributeBonuses: {
    Body: 0,
    Quickness: 0,
    Strength: 0,
    Charisma: 0,
    Willpower: 0,
    Intelligence: 0,
    Reaction: 0,
    Initative: 0,
    Impact: 0,
    Ballastic: 0,
  },
  magicalAttributeBonuses: {
    Body: 0,
    Quickness: 0,
    Strength: 0,
    Charisma: 0,
    Willpower: 0,
    Intelligence: 0,
    Reaction: 0,
    Initative: 0,
    Impact: 0,
    Ballastic: 0,
  },
  log: [],
};

describe('AttributesPanel Component', () => {
  const mockChangeAttributes = jest.fn();
  const mockOnChangeLog = jest.fn();
  const mockOnSpendKarma = jest.fn();

  test('renders without crashing', () => {
    const { container } = render(
      <AttributesPanel
        currentCharacter={mockCharacter}
        Edition="SR3"
        ChangeAttributes={mockChangeAttributes}
        onChangeLog={mockOnChangeLog}
        onSpendKarma={mockOnSpendKarma}
        Log={[]}
      />
    );
    expect(container).toBeTruthy();
  });
});