import { existsSync, writeFileSync, readFileSync, readdirSync } from 'fs';
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

// Define pasta root (raiz do projeto com arquivo package.json
const rootDir = getRootDir(__dirname);

// Define a pasta do arquivo
const arqPath = resolve(rootDir, 'docs', 'index.html');

// Checa se o arquivo index.html da pasta de build docs existe
if (!existsSync(arqPath)) {
    console.error('Falha ao reparar arquivo index.html. Arquivo não existe!');
    process.exit(1);
}

// Pega e modifica o conteúdo
const arqContent = readFileSync(arqPath, 'utf-8')
    .replace(/="\//gm, '="');

// Grava o arquivo
writeFileSync(arqPath, arqContent);
console.log('Arquivo index.html reparado');

// Define a pasta do arquivo
const cssPath = resolve(rootDir, 'docs', 'assets');
const cssFilenames = readdirSync(cssPath)
    .filter(file => file.endsWith('.css'));

// Para cada arquivo css
for (const cssFilename of cssFilenames) {
    // Pega e modifica o conteúdo
    const cssFilePath = resolve(cssPath, cssFilename);
    const cssContent = readFileSync(cssFilePath, 'utf-8')
        .replace(/url\("\/assets\//gm, 'url("');

    // Grava o arquivo
    writeFileSync(cssFilePath, cssContent);
    console.log(`Arquivo ${cssFilename} reparado`);
}
