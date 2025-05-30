# Jest Testing Setup

## What is Jest?
Jest is a JavaScript testing framework developed by Facebook. It's widely used for testing JavaScript applications and provides:
- Zero configuration setup
- Built-in assertion library
- Mock functions
- Code coverage reports
- Snapshot testing
- Parallel test execution

## Project Structure
```
project/
├── package.json
├── src/
│   └── math.js
└── tests/
    └── math.test.js
```

## Installation Steps

1. Initialize a new Node.js project:
```bash
npm init -y
```

2. Install Jest as a development dependency:
```bash
npm install --save-dev jest
```

3. Add test script to package.json:
```json
{
  "scripts": {
    "test": "jest"
  }
}
```

## Code Files

1. src/math.js:
```javascript
function sum(a, b) {
  return a + b;
}

module.exports = { sum };
```

2. tests/math.test.js:
```javascript
const { sum } = require('../src/math');

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds -1 + 1 to equal 0', () => {
    expect(sum(-1, 1)).toBe(0);
  });

  test('adds 0 + 0 to equal 0', () => {
    expect(sum(0, 0)).toBe(0);
  });
});
```

## Running Tests

Run the tests using:
```bash
npm test
```

Expected output:
```
 PASS  tests/math.test.js
  sum function
    ✓ adds 1 + 2 to equal 3
    ✓ adds -1 + 1 to equal 0
    ✓ adds 0 + 0 to equal 0

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.5s
```

## Test Explanation

1. `describe()`: Groups related tests together
2. `test()`: Defines individual test cases
3. `expect()`: Makes assertions about the expected output
4. `toBe()`: Matcher that checks for exact equality

The tests verify that:
- Adding two positive numbers works
- Adding a negative and positive number works
- Adding zeros works

## Additional Jest Features

1. Watch Mode:
```bash
npm test -- --watch
```

2. Coverage Report:
```bash
npm test -- --coverage
```

3. Verbose Output:
```bash
npm test -- --verbose
```
