import { render } from '@testing-library/react';
import SheetDisplay from './SheetDisplay';

// Mock character data for testing
const mockCharacter = {
  street_name: "Shadow Runner",
  age: 25,
  description: "A skilled decker with cybernetic enhancements",
  notes: "Prefers to work alone",
  attributes: {
    Body: 3,
    Quickness: 4,
    Strength: 3,
    Charisma: 3,
    Willpower: 3,
    Intelligence: 4,
    Essence: 5.2,
    Initative: 8,
    Magic: 0,
  },
  race: "Human",
  skills: [
    { Name: "Computer", Level: 5, Type: "Active" },
    { Name: "Electronics", Level: 4, Type: "Active" },
    { Name: "Stealth", Level: 3, Type: "Active" },
  ],
  cyberware: [
    { Name: "Datajack", Essence: 0.2, Cost: 1000 },
    { Name: "Cybereyes", Essence: 0.3, Cost: 3000 },
  ],
  gear: [
    { Name: "Medkit", Cost: 500, Amount: 1 },
    { Name: "Commlink", Cost: 1000, Amount: 1 },
  ],
  contacts: [
    { Name: "Fixer", Level: 2, Type: "paid", Archtype: "Fixer", GeneralInfo: "Helps with jobs" },
  ],
  cash: 5000,
  karma: 10,
  karmaPool: 3,
};

describe('SheetDisplay Component', () => {
  const mockOnChangeStreetName = jest.fn();
  const mockOnChangeAge = jest.fn();
  const mockOnChangeDescription = jest.fn();
  const mockOnChangeNotes = jest.fn();

  test('renders without crashing', () => {
    const { container } = render(
      <SheetDisplay
        currentCharacter={mockCharacter}
        Edition="SR3"
        onChangeStreetName={mockOnChangeStreetName}
        onChangeAge={mockOnChangeAge}
        onChangeDescription={mockOnChangeDescription}
        onChangeNotes={mockOnChangeNotes}
      />
    );
    expect(container).toBeTruthy();
  });
});