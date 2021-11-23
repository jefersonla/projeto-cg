# Reunião do dia 22/11/2021 - de 21h às 22h

## Ausentes

- Rafael Sacramento

##  Pauta de hoje
- **Tópico 1:** Ambiente de desenvolvimento
  - Todos os presentes confirmaram ter o ambiente próximo do ideal para a execução projeto, sendo que
    deixamos para o final da reunião resolução de dúvidas.
- **Tópico 2:** Rotinas de trabalho
  - Ficou acordado disponibilizar de 30min à 1h, fora do espaço de reunião para completar de 1-3 tasks definidas
- **Tópico 3:** Horários de reunião estabelecidos
  - Fica estabelecido os seguintes dias e horários para reunião nos dias que não ocorrerem reunião junto ao professor
    - Seg, Qua - 21h às 22h
    - Sex - 18:30h às 20h
- **Tópico 4:** Verificar uma possibilidade de dilatação do prazo de entrega para melhora da solução final
  - Confirmar se a apresentação será presencial ou não
  - Avaliar se é possível a entrega entre 04/12 a 07/12 devido a questões que não o projeto, que podem impactar 
    diretamente na qualidade do mesmo 
  - Mostrar nosso empenho na criação de uma solução realmente jogável e o porque esse tempo extra é necessário
- **Tópico 5:** Alinhar questões sobre o funcionamento do jogo
  - Jogo vai funcionar em formato widescreen com proporção 16:9
  - Em ‘smartphones’ será solicitado a modificação da orientação para landscape (horizontal)
  - O jogo irá oferecer uma experiência de customização nem que seja minima para trazer imersão ao usuário final
  - **O uso de ferramentas de iluminação prontas é permitido?**
  - Confirmar que de certa forma o foco do projeto é em relação à questão de iteratividade
    diante dos novos problemas que surgiram em razão da pandemia para o ensino/aprendizagem.
  - Fica decidido que o README será o relatório final.
  - **3rd Pessoa com dois controles (movimento e camera) ou visão isométrica de camera fixa?**
    - Ficou decidido que o jogo será em 3rd Pessoa com visão isométrica para não criar entraves no controle
      - joystick movimento 2axis (Smartphone: visual na tela. Computador: teclas numéricas ou ASDW)
      - botão de interação (Smartphone: visual na tela. Computador: barra de espaço ou tecla 'e')
      - demais interações (balões flutuantes, inserção de texto, etc.) serão feitas através de mouse ou clique na tela
    - As demais interações no jogo são através de interfaces utilizando sobreposição com o DOM da página
  - Personagem pode mover e interagir com objetos, os comandos a serem implementados serão
    - Falar -> se próximo de outro personagem
    - Pegar -> se próximo de objeto "pegavel"
  - **Desafio lúdico?**
    - ~~Hanoi~~ - Removido pela complexidade do gameplay
    - ~~Quebra-cabeça~~ - Removido por não ser o foco desejado no momento
    - Problemas Matemáticos (contagem, soma, subtração) - Solução possível a ser implementada
    - Problema Seleção
      - Problema que solicite a criança resolver um problema selecionando
        elementos importantes e descartando os demais
        - Coloque no baldinho ao lado de cada animal que tipo de comida este come:
      - Solução possível a ser implementada
    - Problema Assosiação
      - Problema que solicita a criança que ligue uma sequência de objetos e.g.: 
        - nome de uma cor a respectiva cor
        - número a quantidade
        - etc.
      - Solução possível a ser implementada
  - O jogo será feito num ambiente aberto (fazenda, floresta, campo, praia, espaço em branco)
  - Alinhar o funcionamento das sombras e criar entity manager para organizar os elementos dentro do jogo
  - Avaliar possíveis problemas de desempenho devido a névoa, e uma questão referente ao global illumination e
    directional ilumination
