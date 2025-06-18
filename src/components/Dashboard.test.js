import { render } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock all the components that Dashboard uses
jest.mock('./PriorityPanel', () => () => <div data-testid="priority-panel">Priority Panel</div>);
jest.mock('./PointBuyPanel', () => () => <div data-testid="point-buy-panel">Point Buy Panel</div>);
jest.mock('./IdentityPanel', () => () => <div data-testid="identity-panel">Identity Panel</div>);
jest.mock('./AttributesPanel', () => () => <div data-testid="attributes-panel">Attributes Panel</div>);
jest.mock('./SR2SkillsPanel', () => () => <div data-testid="sr2-skills-panel">SR2 Skills Panel</div>);
jest.mock('./SR3SkillsPanel', () => () => <div data-testid="sr3-skills-panel">SR3 Skills Panel</div>);
jest.mock('./MagicPanel', () => () => <div data-testid="magic-panel">Magic Panel</div>);
jest.mock('./OtakuPanel', () => () => <div data-testid="otaku-panel">Otaku Panel</div>);
jest.mock('./ChargenBox', () => () => <div data-testid="chargen-box">Chargen Box</div>);
jest.mock('./DiceRollerTray', () => () => <div data-testid="dice-roller-tray">Dice Roller Tray</div>);
jest.mock('./LoadCharacter', () => () => <div data-testid="load-character">Load Character</div>);
jest.mock('./SignInPopup', () => () => <div data-testid="sign-in-popup">Sign In Popup</div>);
jest.mock('./SheetDisplay', () => () => <div data-testid="sheet-display">Sheet Display</div>);
jest.mock('./CyberwarePanel', () => () => <div data-testid="cyberware-panel">Cyberware Panel</div>);
jest.mock('./GearPanel', () => () => <div data-testid="gear-panel">Gear Panel</div>);
jest.mock('./DeckingPanel', () => () => <div data-testid="decking-panel">Decking Panel</div>);
jest.mock('./VehiclesPanel', () => () => <div data-testid="vehicles-panel">Vehicles Panel</div>);
jest.mock('./ContactsPanel', () => () => <div data-testid="contacts-panel">Contacts Panel</div>);
jest.mock('./KarmaDisplay', () => () => <div data-testid="karma-display">Karma Display</div>);

describe('Dashboard Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<Dashboard />);
    expect(container).toBeTruthy();
  });
});