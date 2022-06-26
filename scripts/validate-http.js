import fetch from 'node-fetch';
import chalk from 'chalk';

/**
 * Função para lançar erro
 * @param error
 */
function errorHandling(error) {
    throw new Error(chalk.red(error.message));
}

/**
 * Função que retorna os valores das URLs com chaves e valores { chave: valor }
 * @param arrayLinks
 * @returns {*}
 */
function getURLsArray(arrayLinks) {
    return arrayLinks
        .map(object => Object
            .values(object).join());
}

/**
 * Retorna um array com as respostas das requisições de um array de links
 * @param arrayURLs
 * @returns {Promise<Awaited<unknown>[]>}
 */
async function getStatusArray(arrayURLs) {
    try {
        return await Promise
            .all(arrayURLs
                .map(async url => {
                    const res = await fetch(url);
                    return `${res.status} - ${res.statusText}`;
                }));
    } catch (err) {
        errorHandling(err);
    }
}

/**
 * Função retorna array de objeto que mostra os links e o status de suas respostas
 * @param arrayLinks
 * @returns {*}
 */
async function validateURLs(arrayLinks) {
    const urls = getURLsArray(arrayLinks);
    const statusArray = await getStatusArray(urls);
    return arrayLinks.map((object, index) => ({
        ...object,
        status: statusArray[index]
    }));
}

export {validateURLs}