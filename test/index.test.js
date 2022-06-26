import {readFilesUsingAsyncAwait} from '../index.js';

const arrayResult = [
   {
      FileList: 'https://developer.mozilla.org/pt-BR/docs/Web/API/FileList'
   }
];

describe('readFilesUsingAsyncAwait::', () => {
   it('expect to be function', () => {
      expect(typeof readFilesUsingAsyncAwait).toBe('function');
   });
   it('must return array result', async () => {
      const result = await readFilesUsingAsyncAwait('C:/Users/gu_fe/Desktop/programs/node/lib_markdown/' +
         'test/files/texto1.md');
      expect(result).toEqual(arrayResult);
   });
   it('must return message "no links found"', async () => {
      const result = await readFilesUsingAsyncAwait('C:/Users/gu_fe/Desktop/programs/node/lib_markdown/' +
         'test/files/texto2.md');
      expect(result).toBe('No links found :(');
   });
});