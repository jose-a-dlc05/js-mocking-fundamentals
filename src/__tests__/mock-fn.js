/**
 * Often when writing JavaScript tests and mocking
 * dependencies, you’ll want to verify that the function
 * was called correctly. That requires keeping track of
 * how often the function was called and what arguments
 * it was called with. That way we can make assertions
 * on how many times it was called and ensure it was
 * called with the right arguments.
 *
 * Task: use jest assertions to check
 *      1. how often the function is called
 *      2. the function is called with the right arguments
 *
 * Execute: Use `npx jest --watch src/__tests__/mock-fn.js` to watch the test
 */

const thumbWar = require('../thumb-war');
const utils = require('../utils');

test('returns winner', () => {
	jest.spyOn(utils, 'getWinner');
	utils.getWinner.mockImplementation((p1, p2) => p1);

	const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler');
	expect(winner).toBe('Kent C. Dodds');
	// Your code:
	expect(utils.getWinner).toHaveBeenCalledTimes(2);
	expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler');
	expect(utils.getWinner).toHaveBeenNthCalledWith(
		1,
		'Kent C. Dodds',
		'Ken Wheeler'
	);
	expect(utils.getWinner).toHaveBeenNthCalledWith(
		2,
		'Kent C. Dodds',
		'Ken Wheeler'
	);
	expect(utils.getWinner.mock.calls).toEqual([
		['Kent C. Dodds', 'Ken Wheeler'],
		['Kent C. Dodds', 'Ken Wheeler'],
	]);

	// cleanup
	utils.getWinner.mockRestore();
});

/**
 * Hints:
 * - https://jestjs.io/docs/en/mock-function-api#mockfnmockcalls
 * - https://jestjs.io/docs/en/expect#tohavebeencalledtimesnumber
 * - https://jestjs.io/docs/en/expect#tohavebeennthcalledwithnthcall-arg1-arg2-
 *
 */

/**
 * My Interpretation
 * One thing monkey-patching cannot catch is
 * if the function is called incorrectly. When
 * mocking dependencies we want to make sure the function
 * is being called correctly. That means you have to have the
 * correct number of inuts if any and how many times it gets
 * called.
 *
 * Another thing with monkey-patching is keeping up with the
 * mental gymnastics on keeping track of the origin implementation.
 * To relieve yourself of this, jest offers jest.spyOn which takes in
 * the module and the method and from there you can use mockImplementation
 * and mockRestore to restore the original implementation.
 *
 * Monkey-patching is also a negative when using ES modules and in that case
 * , we'd have to mock the entire module with the jest.mock API, which
 * takes the path to the module and then a callback function returning the object
 * with the mock version of the module as a property.
 */
