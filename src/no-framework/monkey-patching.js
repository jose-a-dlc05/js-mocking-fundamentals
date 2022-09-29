/**
 * Mocking allows our tests to be deterministic and
 * ensure that we will get the expected result every time.
 *
 * The most naïve approach to mocking in JavaScript is to
 * override an object’s properties in the test. This is
 * pretty simple and straightforward, but also fairly
 * limited.
 *
 * In this lesson, we’ll monkey patch our `getWinner`
 * function to always return the same winner every time the
 * function is called. After the test is run, we’ll clean up
 * the mock and assign the original function implementation
 * back to `getWinner`.
 *
 * Task: patch a `getWinner` function to always return the
 * same winner every time the function is called.
 *
 * Execute: Use `npx jest --watch ./src/no-framework/monkey-patching.js` to watch the test
 */

const assert = require('assert');
const thumbWar = require('../thumb-war');
const utils = require('../utils');

// Your code:
// monkey patch
const originalGetWinner = utils.getWinner();
utils.getWinner = (player1, player2) => player1;

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
assert.strictEqual(winner, 'Kent C. Dodds');

// Your code:
// cleanup
utils.getWinner = originalGetWinner;

/**
 * Mocking seems to be a 3-step procedure:
 * 1. Import the module/function/api call wanting to be utilized
 * 2. Mock the module/function i.e. jest.mock('axios')
 * 3. Fake the function outputs
 *
 * What we're doing with mocking overall is controlling the output of what that
 * dependency that the file/component uses returns.
 *
 * The most simplistic way of ding this on your own is 'monkey-patching' as seen above
 * or in other words overriding the dependency so that the output is the same every time
 * because if you leave it to the actual implementation, you could get a different result every time...or worse, a charge
 * goes through. 🥲
 */
