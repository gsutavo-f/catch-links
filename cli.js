import { readFilesFromDirectory } from './index.js';
import chalk from 'chalk';

const filePath = process.argv[2];

/**
 * Função que imprime a lista de links filtradas de um texto
 * @param dirPath
 * @returns {Promise<void>}
 */
async function textProcedure(dirPath) {
    const result = await readFilesFromDirectory(dirPath);
    console.log(chalk.yellow('Links List: '), result);
}

textProcedure(filePath);

