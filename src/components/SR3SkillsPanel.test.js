import { render } from '@testing-library/react';
import SR3SkillsPanel from './SR3SkillsPanel';

// Mock character data for testing
const mockCharacter = {
  attributes: {
    Body: 3,
    Quickness: 4,
    Strength: 3,
    Charisma: 3,
    Willpower: 3,
    Intelligence: 4,
  },
  skills: [],
};

describe('SR3SkillsPanel Component', () => {
  const mockUpdateSkills = jest.fn();

  test('renders without crashing', () => {
    const { container } = render(
      <SR3SkillsPanel
        currentCharacter={mockCharacter}
        characterSkills={[]}
        onUpdateSkills={mockUpdateSkills}
        activeSkillPoints={34}
        KnowledgeSkillsMax={20}
        LanguageSkillsMax={6}
      />
    );
    expect(container).toBeTruthy();
  });
});