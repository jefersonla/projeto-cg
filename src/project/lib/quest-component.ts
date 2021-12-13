// import { entity } from "./entity.js";



const _TITLE = 'Primeiros passos';
const _TEXT = `Bem vindo(a) à Low Poly School, a escola que utiliza que utiliza de realidade aumentada para ensinar crianças de forma divertida e interativa. Seu objetivo inicial é coletar 5 cubos que sejam da mesma cor do texto mostrado. Boa sorte!!!`;

export class QuestComponent {

  count: number = 0;

  constructor() {
    // super();
    // const e = document.getElementById('quest-ui');
    // e.style.visibility = 'hidden';
  }

  InitComponent() {
    // this._RegisterHandler('input.picked', (m) => this._OnPicked(m));
  }

  _OnPicked(msg) {
    const quest = {
      id: 'foo',
      title: _TITLE,
      text: _TEXT,
    };
    this._AddQuestToJournal(quest);
  }

  _AddQuestToJournal(quest) {
    // const ui = this.FindEntity('ui').GetComponent('UIController');
    // ui.AddQuest(quest);
  }

  handleMessage(msg: boolean) {
    msg ? this.count++ : this.count = 0;
    if (this.count === 5) {
      //TODO IMPLEMENTAR LOGICA
    }

  }
};

