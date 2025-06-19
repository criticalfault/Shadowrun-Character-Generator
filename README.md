# Shadowrun-Character-Generator

[![Deploy Website](https://github.com/criticalfault/Shadowrun-Character-Generator/actions/workflows/push_to_s3.yml/badge.svg)](https://github.com/criticalfault/Shadowrun-Character-Generator/actions/workflows/push_to_s3.yml)

## Overview
This is a React-based character generator for Shadowrun 2nd and 3rd editions. It allows users to create characters using either the Priority or Point Buy methods, with support for various character types including magical users, deckers, and otaku.

## Running the Application
```bash
npm install
npm start
```

## Testing
The application uses Jest for testing. To run the tests:

```bash
# Run all tests
npm test -- --watchAll=false

# Run tests with coverage report
npm test -- --watchAll=false --coverage

# Or use the provided script
./run-tests.sh
```

### Test Structure
Tests are organized to match the component structure of the application:

- `App.test.js` - Tests for the main App component
- `components/*.test.js` - Tests for individual components

The tests currently focus on basic component rendering to ensure the application structure is sound. Some components have more detailed tests that verify:
- Component rendering
- Basic functionality

### Current Test Status
Some tests may fail due to the complex nature of the components and their interdependencies. The test suite is a work in progress and will be expanded over time.

### Adding New Tests
When adding new tests, make sure to:
1. Mock any external dependencies
2. Provide complete mock data for components that expect specific props
3. Use the `--legacy-peer-deps` flag when installing new testing dependencies to avoid conflicts
