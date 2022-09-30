/**
 * So far we’re still basically monkey-patching the utils
 * module which is fine, but could lead to problems in the
 * future, especially if we want to mock a ESModule export
 * which doesn’t allow this kind of monkey-patching on
 * exports. Instead, let’s mock the entire module so when
 * our test subject requires the file they get our mocked
 * version instead.
 *
 * Task: refactor the code to mock the entire module.
 *
 * Execute: Use `npx jest --watch src/__tests__/inline-module-mock.js` to watch the test
 */

const thumbWar = require('../thumb-war');
const utils = require('../utils');

jest.mock('../utils', () => {
	return {
		getWinner: jest.fn((p1, p2) => p1),
	};
});

test('returns winner', () => {
	const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
	expect(winner).toBe('Kent C. Dodds');
	expect(utils.getWinner.mock.calls).toEqual([
		['Kent C. Dodds', 'Ken Wheeler'],
		['Kent C. Dodds', 'Ken Wheeler'],
	]);

	// cleanup
	utils.getWinner.mockReset();
});

/**
 * Hints:
 * - https://jestjs.io/docs/en/es6-class-mocks#calling-jestmockdocsenjest-objectjestmockmodulename-factory-options-with-the-module-factory-parameter
 *
 * Checkout master branch to see the answer.
 * Monkey-patching is also a negative when using ES modules and in that case
 * , we'd have to mock the entire module with the jest.mock API, which
 * takes the path to the module and then a callback function returning the object
 * with the mock version of the module as a property.
 */
