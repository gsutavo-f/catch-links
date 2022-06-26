import {readFilesUsingAsyncAwait} from '../index.js';

test('expect to be function', () => {
   expect(typeof readFilesUsingAsyncAwait).toBe('function');
});