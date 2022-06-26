import {readFilesFromDirectory, readFilesUsingAsyncAwait} from '../index.js';
import {validateURLs} from './validate-http.js';
import chalk from 'chalk';

const parameters = process.argv;

/**
 * Função que imprime a lista de links filtradas de um texto
 * @returns {Promise<void>}
 * @param parameters
 */
async function textProcedure(parameters) {
    const dirPath = parameters[2];
    const result = await readFilesFromDirectory(dirPath);
    console.log(chalk.yellow('Links List: '), result);
}

/**
 * Função que imprime links quebrados encontrados nos arquivos markdown presentes em um diretório
 * @param parameters
 * @returns {Promise<void>}
 */
async function showErrorResponseLinksFromDirectory(parameters) {
    const dirPath = parameters[2];
    const action = parameters[3];
    const result = await readFilesFromDirectory(dirPath);
    if (action === 'validate') {
        console.log('valid links: ', validateURLs(result));
    } else {
        console.log('links found: ', result);
    }
}

/**
 * Função que imprime links filtrados por determinada resposta de requisição
 * @param parameters
 * @returns {Promise<void>}
 */
async function showErrorResponseLinksFromFile(parameters) {
    const filePath = parameters[2];
    const action = parameters[3];
    const result = await readFilesUsingAsyncAwait(filePath);
    if (action === 'validate') {
        console.log('valid links: ', await validateURLs(result));
    } else {
        console.log('links found: ', result);
    }
}

showErrorResponseLinksFromFile(parameters);

