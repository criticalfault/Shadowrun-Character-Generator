import { render } from '@testing-library/react';
import PriorityPanel from './PriorityPanel';

// Mock props for testing
const mockProps = {
  BooksFilter: ["cc", "mits", "sr3", "mm", "mat", "r3"],
  ChangePriorities: jest.fn(),
  CharacterPriorities: {
    Magic: "A",
    Attributes: "B",
    Skills: "C",
    Resources: "D",
    Race: "E",
  },
  magicalChoice: "Full Magician", // Changed from "None" to match available options
  moreMetahumansOption: false,
  IsOtaku: false,
  ChangeRace: jest.fn(),
  ChangeMagic: jest.fn(),
  PowerLevel: 2,
  ChangePowerLevel: jest.fn(),
  selectedRace: "Human",
  Race: "Human",
  onChangePriorityRace: jest.fn(),
  ChangeRaceChoices: jest.fn(),
  ChangeMaxAttributes: jest.fn(),
  ChangeMaxSkills: jest.fn(),
  ChangeMaxCash: jest.fn(),
  ChangeMaxSpellPoints: jest.fn(),
  ChangeMagicChoices: jest.fn(),
  ChangeRaceBonuses: jest.fn(),
  ChangeMoreMetahumansOption: jest.fn(),
  ChangeIsOtakuOption: jest.fn(),
  Edition: "SR3",
};

describe('PriorityPanel Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<PriorityPanel {...mockProps} />);
    expect(container).toBeTruthy();
  });
});