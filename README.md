# 🏫 LowPolySchool

---

Jogo parecido com o visual do anim**-crossing, porém com atividades lúdicas para séries iniciais 
(1-4 ano Ensino Fundamental). Ler o white-paper (link white-paper) para entender mais.

## ▶️ **[Jogue Agora!](https://jefersonla.github.io/projeto-cg/)**

## 📘 Introdução

**TODO**: Documentar melhor o que é esse jogo

## ⚠️ Aviso Professor

### Por mais que algumas tecnologias tenham sido utilizadas para melhorar a interação com o projeto nenhuma delas é necesśaria para a execução do mesmo. Então fique tranquilo e aproveite a leitura da documentação :)

## 🔧 Tecnologias utilizadas

### 1. [Svelte](https://svelte.dev/)
Framework Web, bastante simples de se utilizar e sem uso de [virtual-dom](https://pt-br.reactjs.org/docs/faq-internals.html).

Utilize a referência abaixo para aprender mais sobre o Svelte, porém não se preocupe já que
seu uso nesse projeto é limitado apenas a ‘interface’ e como bundler e pre-processador para linguagem
TypeScript.

**Aprenda mais em: https://svelte.dev/tutorial/basics**

### 2. [TypeScript](https://www.typescriptlang.org/)
Linguagem derivada a partir do JavaScript que auxilia no desenvolvimento de aplicações, através da 
inserção de tipos ao JavaScript. **Toda sintaxe JavaScript (usaremos a abreviação JS no restante do documento) 
é compatível com o TypeScript (usaremos a abreviação TS no restante do documento).

Pense no TS como um [superset](https://mathinsight.org/definition/superset) de JS que estende
esse para uma linguagem melhor e mais fácil de utilizar, porém, que não substitui o JS, ou seja, o código
em TS precisa ser [transpilado](https://dev.to/kealanparr/compiling-vs-transpiling-3h9i) para JS, para que
o navegador entenda (lembre que o browser aceita apenas HTML como linguagem de marcação, apenas CSS como linguagem
de folha de estilos e apenas JavaScript para linguagem de programação de interação, qualquer outra linguagem
precisa primeiro ser convertida em JS para que seja possível de ser utilizada no browser).

Além dos tipos iremos usar apenas a definição de classes do TS que é bem similar ao JS. As documentações
para os recursos que iremos utilizar se encontram nos links abaixo:

**2.1 Guia para novos desenvolvedores: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html**

**2.2 O Básico: https://www.typescriptlang.org/docs/handbook/2/basic-types.html**

**2.3 Objetos, Classes e Tipos: https://www.typescriptlang.org/docs/handbook/2/objects.html**

### 3. [Vite](https://vitejs.dev/)

O [ecossistema do front-end](https://www.imaginarycloud.com/blog/a-javascript-ecosystem-overview/) em 2021 é bem desafiador para novos desenvolvedores, mas não tem porque complicar
tanto não é? As coisas antigamente eram crie um arquivo, leia documentação, seja feliz!

**Então vamos manter as coisas assim certo!?**

Para facilitar nossa vita iremos usar um "modulo prepara tudo" o Vite. Não vou entrar no kernel deste
já que vocês podem ler a documentação do mesmo abaixo, mas a ideia é bem simples ele é um conjunto de aplicações
que faz o processo de iniciar esse projeto extremamente simples, basta chegar no terminal e digitar:

```shell
npm run dev
```

Você será informado de qual porta o servidor web está rodando (calma vou explicar mais sobre isso a seguir),
e então vai ser só abrir o endereço no seu browser e editar os arquivos e o projeto deve funcionar sem problemas.

**Conheça mais sobre o vite em: https://vitejs.dev/guide/**

### 4. [Node.js](https://nodejs.org)

Eu sei, eu sei... nem todo mundo gosta de codar em JS :/, mas uma coisa é um fato importante, o JS e em especial o
Node.js e seu Package Manager oficial o NPM tem uma das maiores comunidades OpenSource da atualidade com mais de 
[1.3 bilhões de pacotes](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages.html) (mesmo que alguns desses [exagerem as vezes](https://dev.to/jyotishman/10-useless-npm-package-with-millions-of-downloads-de9)).

E é aqui que entra o uso do node.js por esse projeto, não necessariamente para execução porém como uma ferramenta de tooling
com algumas aplicações de terminal ou CLI (Command Line Interface) que irão aumentar nossa produtividade de maneira
bastante eficiente.

Atualmente o node.js está na versão `17.1.0`, porém como podem observar na documentação do node.js oficial para o 
[cronograma de lançamentos](https://nodejs.org/en/about/releases/) essa versão não é LTS (long-term-support), e como
esse projeto não tem nenhum requisito extremamente específico, utilizem qualquer versão `>= 14.x.x`.

Para facilitar a instalação do node.js utilizem o [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager), no Windows
pode ser utilizando o [NVM-Windows](https://github.com/coreybutler/nvm-windows).

No caso de dificuldades sobre a instalação vocês podem baixar e instalar dos repositórios oficiais da distribuição
para quem usar linux, ou do próprio site do node.js (https://nodejs.dev/download).

Vou deixar algumas documentações sobre a história do Node.js e como usar ele, para quem tiver curiosidade, porém
lendo os comandos que irei apresentar abaixo e sabendo que vamos usar bastante o npm, não vão existir dificuldades 
notavéis em adotar essa ferramenta.

**Aprenda mais em: https://nodejs.dev/learn**

### 5. [Three.js](https://threejs.org/)

A nossa cereja do bolo é o Three.js, para quem ainda não estiver convencido das vantagens em se utilizar o Three.js 
em detrimento das API's diretas do WebGl, recomendo este [guia](http://learnwebgl.brown37.net/), mas resumindo bem o 
Three.JS é similar ao TypeScript, ele nos proporciona algumas utilidades que não só facilitam como também melhoram
a qualidade da solução final ao nos apresentar recursos valiosos.

Como podem ver nesse [link](https://www.npmjs.com/package/three), o three.js está publicado no NPM e pode ser integrado
facilmente a projetos do Node.js (nosso caso), além disso, por mais que não tenha diretamente os tipos referenciados no
próprio pacote existe um pacote chamado [`@types/three`](https://www.npmjs.com/package/@types/three) que nos oferece isso, o que melhora ainda mais uma vez que 
iremos utilizar TS.

**TENTE aprender mais em: https://threejs.org/docs/** (documentação simplificada não é um dos fortes do projeto)

## 💻 Ambiente de desenvolvimento

**1. Editor de Texto VSCode**

Para quem não tiver problemas em utilizar um editor de texto recomendo utilizar o 
[VSCode](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

**2. IDE WebStorm**

Para quem quiser utilizar uma IDE (recomendo) vocês podem utilizar qualquer uma da JetBrains e instalar o plugin
para JavaScript/TypeScript, ou baixar a IDE **[WebStorm](https://www.jetbrains.com/pt-br/webstorm/)** que já traz tudo 
isso pronto. 

Ela é paga, porém, tem ‘trial’ de 30 dias (o suficiente para o projeto) e oferece também licença para estudantes por 
2 anos (podendo estes serem prorrogados enquanto você for estudante).

Para quem gostar e estiver com sangue nos olhos mesmo dá até para pagar a licença mensal que é algo próximo dos R$ 50,00
por mês, ou seja, é só cortar o Netflix que tá tudo certo!

**Para conseguir sua licença de estudante basta usar seu e-mail UFBA em: https://www.jetbrains.com/pt-br/community/education/**

## 🚀 Executando a Aplicação

Para executar a aplicação em seu estado atual siga os seguintes passos:

1. Baixe o projeto e abra ele com sua IDE ou Editor de Texto preferido. Se utilizar git
execute o comando abaixo:

```shell
git clone https://github.com/MATA65-2021-2/problema-metaverso-g4.git
cd problema-metaverso-g4
# Escolha algum dos metodos abaixo para iniciar o editor pelo terminal
# webstorm .
# code .
```

2. Com o projeto aberto em seu editor no terminal instale as dependências do projeto (lembre de ter o node.js e o npm
 instalado):
 
```shell
npm install
```

3. Com as dependências instaladas ainda no terminal execute:

```shell
npm run dev
```

Abra o link informado no terminal em seu navegador favorito e dê inicio ao seu processo
de desenvolvimento. Para facilitar o projeto conta com um módulo de [Hot-Reloading](https://stackoverflow.com/questions/41428954/what-is-the-difference-between-hot-reloading-and-live-reloading-in-react-native#:~:text=1.,are%20deep%20in%20your%20navigation.)
que recarrega a aplicação sem a necessidade do refresh manual, então todas as suas modificações serão
em tempo real no projeto!

## 🚧 Desenvolvendo Módulos

TODO Explicar como desenvolver novas features

## 👩‍🔧 Testando a Aplicação

TODO Explicar sobre o processo de testes e sobre boas práticas

## 📐 Arquitetura da Aplicação

TODO Explicar sobre como a arquitetura da aplicação foi modelada

## 🎮 Game Development

TODO Explicar o objetivo dessa guia

### 🧔 1. Character Design

TODO Explicar a escolha dos personagens

### 🎲 2. 3D Modeling and LowPoly

TODO Explicar sobre os topicos acima

### 📚 3. Level Design

TODO continuar as descrições do que foi importante para esse projeto...

## 📖 WhitePaper e Citação

TODO (ainda em análise) Colocar link para PDF se este existir e explicar como citar
esse projeto

## 🛠️ Suporte e Desenvolvimento

Desenvolvido com ❤️ em Salvador-BA na **UFBA** (Universidade Federal da Bahia) por:

- **Alana Bispo** ([@absouza](https://github.com/absouza))
- **Alexandre Campos** ([@alexandrefscampos](https://github.com/alexandrefscampos))
- **André *primeiro_sobrenome*** ([@seuser](seulink))
- **Cainan Neves** ([@CainanNeves](https://github.com/CainanNeves))
- **Jeferson Lima** ([@jefersonla](https://github.com/jefersonla))
- **Rafael Nobre** ([@seuser](seulink))

**⚠ Hospedado também em https://github.com/jefersonla/projeto-cg/invitations**
