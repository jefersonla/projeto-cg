# 🏫 LowPolySchool (Escolinha)

---

Jogo parecido com o visual do anim**-crossing, porém com atividades lúdicas para séries iniciais
(1-4 ano Ensino Fundamental). Na pasta `documentation` (a pasta docs contem a aplicação por limitações
do GitHub, ver [gh-pages limitations](https://github.community/t/can-i-define-a-custom-source-or-folder-from-which-my-site-hosted-on-github-pages-can-load-from/10237))
existem detalhes acerca das diversas etapas do desenvolvimento da aplicação.
Para maiores detalhes existe também um white-paper (TBR - To Be Released), pendente de submissão.

## ▶️ **[Jogue Agora!](https://jefersonla.github.io/projeto-cg/)**

**Obs.: O arquivo index.html na raiz deste projeto é um arquivo de montagem, utilizado pelo framework Svelte. Não 
utilize-o, para rodar a aplicação. Caso esteja atrás do projeto para execução utilize a pasta `docs` ou a pasta 
`app`que contém a aplicação compilada para utilização.**       

## 📘 Introdução

O Low Poly School é um jogo 3D, low-poly (poucos polygons), com visual cartunesco, porém, sem renunciar o uso de
efeitos de reflexão e sombra, que visa apresentar uma nova maneira de aprendizado através de um mundo virtual
onde o aluno pode criar seu avatar e realizar algumas das atividades possíveis.

O jogo visa servir como ferramenta de auxílio as aulas nas séries iniciais trazendo para um professor
uma simples mais poderosa ferramenta de interação que visa melhorar ainda mais o interesse dos alunos.

A motivação para essa ideia vêm do interesse de criar um laboratório virtual de ensino, que seja 3D, multiplataforma e
online (esta feature será incluída em lançamentos futuros) e aproxime os alunos no ensino remoto e também que permita
que estes se interessem ainda mais pelos assuntos estudados.

Algumas fontes que servem como motivação para esta ideia:

- [The Effective Use of Game-Based Learning in Education | Andre Thomas | TEDxTAMU](https://www.youtube.com/watch?v=-X1m7tf9cRQ&ab_channel=TEDxTalks)
- [The Power of Gamification in Education | Scott Hebert | TEDxUAlberta](https://www.youtube.com/watch?v=mOssYTimQwM&ab_channel=TEDxTalks)
- [Gather Town - Ferramenta para reuniões online através do uso de avatares](https://www.gather.town/)
- [Can we Improve Tutorials for Complex Games?](https://www.youtube.com/watch?v=-GV814cWiAw&t=361s&ab_channel=GameMaker%27sToolkit)
- [How Accessible Were 2020's Biggest Games?](https://www.youtube.com/watch?v=RWQcuBigOj0&t=530s&ab_channel=GameMaker%27sToolkit)
- [I Tried Making a 3D RPG Game in JavaScript](https://www.youtube.com/watch?v=SBfZAVzbhCg&ab_channel=SimonDev)

O Projeto LowPolySchool("Escolinha") está sendo observado por uma professora de séries iniciais com mestrado em 
Educação de modo a ser um case realmente adequado para o meio que este pode ser utilizado.

## 📓 História

***Professor(a)*** -
Olá {user_name}!
Seja muito bem vindo a Escolinha! :)

***Professor(a)*** -
Vou te mostrar sua primeira atividade, tá bom?

***Professor(a)*** -
...

A Escolinha é uma escola a ceu aberto com um leque de atividades lúdicas para execução pelos alunos das séries iniciais.
Nossa ideia é garantir um ambiente ao qual os alunos possam criar uma representação destes e executar atividades que 
antes estes executariam em formato escrito. 

O lore da história é o próprio aluno e o ambiente onde ele está, a única coisa que o jogo tem de extra é a presença da
**'Pró'** (PeRsonagem de Orientação) que irá guiar o aluno no mundo virtual informando as tarefas que este terá que 
executar.

## ⚠️ Aviso Professor CG

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
[1.3 bilhões de pacotes](https://blog.npmjs.org/post/615388323067854848/so-long-and-thanks-for-all-the-packages.html) 
(mesmo que alguns desses [exagerem as vezes](https://dev.to/jyotishman/10-useless-npm-package-with-millions-of-downloads-de9)).

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

## 🚀 Executando a aplicação

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
de desenvolvimento. Para facilitar o projeto conta com um módulo de 
[Hot-Reloading](https://stackoverflow.com/questions/41428954/what-is-the-difference-between-hot-reloading-and-live-reloading-in-react-native#:~:text=1.,are%20deep%20in%20your%20navigation.)
que recarrega a aplicação sem a necessidade do refresh manual, então todas as suas modificações serão
em tempo real no projeto!

## 👩‍🔧 Preparando ambiente de desenvolvimento

TODO dar segmento a essa tarefa (terminar durante a aula)

## 🚧 Desenvolvendo módulos e testando a aplicação

TODO Explicar como desenvolver novas features
TODO Explicar sobre o processo de testes e sobre boas práticas

## 📖 WhitePaper e Citação

TODO (TBR - To Be Released) 
- Colocar link para PDF 
- Explicar como citar esse projeto
- Tentar submeter em alguma conferência

## 🛠️ Suporte e Desenvolvimento

Desenvolvido com ❤️ em Salvador-BA na **UFBA** (Universidade Federal da Bahia) por:

- **Alana Bispo** ([@alanabispo](https://github.com/alanabispo))
- **Alexandre Campos** ([@alexandrefscampos](https://github.com/alexandrefscampos))
- **André Luiz Silva** ([@andresantosufba](https://github.com/andresantosufba))
- **Cainan Neves** ([@CainanNeves](https://github.com/CainanNeves))
- **Jeferson Lima** ([@jefersonla](https://github.com/jefersonla))
- **Rafael Nobre** ([@rafaelnsacramento](https://github.com/rafaelnsacramento))

**⚠ Hospedado também em https://github.com/jefersonla/projeto-cg**

```text
todo:

- https://github.com/mrdoob/three.js/pull/22833
- https://github.com/sunag/flow
- https://tablericons.com/


```


## Other Licenses

```text
https://www.chosic.com/download-audio/27248/
Fluffing a Duck Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 3.0 License
http://creativecommons.org/licenses/by/3.0/
Music promoted by https://www.chosic.com/free-music/all/ 
```

```text
https://kenney.nl/assets/survival-kit
License: (CC0 1.0 Universal) You're free to use
these game assets in any project, personal or 
commercial. There's no need to ask permission before
using these. Giving attribution is not required, but 
is greatly appreciated!
```
