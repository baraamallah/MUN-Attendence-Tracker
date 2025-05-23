
// scripts/check-env.js
try {
  require('dotenv-safe').config({
    allowEmptyValues: false, // Set to true if you want to allow empty values in .env.local but ensure keys exist
    example: '.env.example',
    path: '.env.local'
  });
  console.log('SUCCESS: Required local environment variables are present and loaded from .env.local');
} catch (error) {
  console.error('\nERROR: Missing required local environment variables.');
  console.error('Please ensure your .env.local file is created and all variables from .env.example are defined.\n');
  console.error('Details:', error.message);
  process.exit(1);
}
