#!/bin/bash

# Run Jest tests with coverage
npm test -- --watchAll=false --coverage

# Display test results summary
echo "Test execution completed!"