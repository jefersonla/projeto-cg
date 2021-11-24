import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join, resolve, dirname }from 'path';
import { fileURLToPath } from 'url';

// Pega pasta atual
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Obtem a pasta raiz do projeto node.js
 * @param pathDir
 * @return {string|*}
 */
export const getRootDir = (pathDir = __dirname) => {
    if (existsSync(join(pathDir, "package.json"))) {
        return resolve(pathDir);
    }

    if (resolve(pathDir) === resolve(join(pathDir, ".."))) {
        throw new Error(
            "Falha em encontrar a rootDir do projeto. Verifique a existência de um package.json"
        );
    }

    return getRootDir(join(pathDir, ".."));
};

// Define a pasta do arquivo
const arqPath = resolve(getRootDir(__dirname), 'docs', 'index.html');

// Checa se o arquivo index.html da pasta de build docs existe
if (!existsSync(arqPath)) {
    console.error('Falha ao reparar arquivo index.html. Arquivo não existe!');
    return 1;
}

// Pega e modifica conteudo
const arqContent = readFileSync(arqPath, 'utf-8')
    .replace(/="\//gm, '="');

// Grava o arquivo
writeFileSync(arqPath, arqContent);
console.log('Reparando arquivo index.html');
