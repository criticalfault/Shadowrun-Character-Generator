import { render } from '@testing-library/react';
import OtakuPanel from './OtakuPanel';

// Mock character data for testing
const mockCharacter = {
  otakuPath: "Technoshaman",
  complexForms: [],
  attributes: {
    Intelligence: 4,
    Charisma: 3,
    Willpower: 3,
  },
};

describe('OtakuPanel Component', () => {
  const mockOnChangeComplexForm = jest.fn();
  const mockOnChangeOtakuPath = jest.fn();

  test('renders without crashing', () => {
    const { container } = render(
      <OtakuPanel
        Edition="SR3"
        currentCharacter={mockCharacter}
        complexForms={[]}
        onChangeComplexForm={mockOnChangeComplexForm}
        onChangeOtakuPath={mockOnChangeOtakuPath}
      />
    );
    expect(container).toBeTruthy();
  });
});