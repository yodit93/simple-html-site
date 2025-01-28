import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Set the test environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
  moduleFileExtensions: ['js', 'ts'], // Recognize .ts files
  moduleDirectories: ['node_modules'], // Locate modules in node_modules
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Map axios correctly
  },
};

export default config;
