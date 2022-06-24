import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Função para executar o readFile da biblioteca fs
 * @param filePath
 */
function readFile(filePath) {
    const encoding = 'utf-8';
    fs.readFile(filePath, encoding, callBackFunctionWithErrorHandling);
}

/**
 * Função de callback para o fs.readfile, onde o '_' significa que
 * se deseja ignorar o primeiro parametro, neste caso o erro
 * @param _
 * @param data
 */
function callBackFunctionWithoutErrorHandling(_, data) {
    console.log(chalk.green(data));
}

/**
 * Função de callback para o fs.readfile com tratamento de erro
 * @param err
 * @param data
 */
function callBackFunctionWithErrorHandling(err, data) {
    if (err) {
        errorHandling(err);
    }
    console.log(chalk.green(data));
}

/**
 * Função para lançar erro
 * @param err
 */
function errorHandling(err) {
    throw new Error(chalk.red.bold(err));
}

/**
 * Função que executa o fs.readFile usando promises. Significa
 * que vai executar o código que está em then() apenas após a
 * execução de fs.readFile, sendo passado uma função de tratamento
 * de erro para o catch()
 * @param filePath
 */
function readFileUsingPromises(filePath) {
    const encoding = 'utf-8';
    fs.promises
        .readFile(filePath, encoding)
        .then((data) => console.log(chalk.green(data)))
        .catch(errorHandling);
}

/**
 * Função que retorna links e suas chaves extraídos de um texto
 * @param text
 */
function extractLinks(text) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].\S*)\)/gm;
    const resultsArray = [];
    let temp = regex.exec(text);
    for (temp; temp !== null; temp = regex.exec(text)) {
        resultsArray.push({[temp[1]]: temp[2]});
    }
    return resultsArray.length === 0
        ? 'No links found :('
        : resultsArray;
}

/**
 * Função que retorna os links extraídos de um arquivo markDown
 * usando async e await
 * @returns {Promise<string|*[]>}
 * @param filePath
 */
async function readFilesUsingAsyncAwait(filePath) {
    const encoding = 'utf-8';
    try {
        const result = await fs.promises.readFile(filePath, encoding);
        return extractLinks(result);
    } catch (err) {
        errorHandling(err);
    } finally {
        console.log(chalk.yellow('Operation Completed'))
    }
}

/**
 * Função que retorna todos os links extraídos de arquivos markdown
 * presentes num diretório
 * @param dirPath
 * @returns {Promise<Awaited<string|[]>[]>}
 */
export async function readFilesFromDirectory(dirPath) {
    const absolutePath = path.join(__dirname, '/', dirPath);
    const encoding = 'utf-8';
    try {
        const files = await fs.promises.readdir(absolutePath, {encoding});
        return await Promise.all(files.map(async (file) => {
            const filePath = `${absolutePath}/${file}`;
            const text = await fs.promises.readFile(filePath, encoding);
            return extractLinks(text);
        }));
    } catch (err) {
        errorHandling(err);
    } finally {
        console.log(chalk.yellow('Operation Completed'))
    }
}

export {readFilesUsingAsyncAwait}