import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPergunta } from 'src/types/Pergunta';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  controlesSchema: IControlesSchema;

  materiaSelecionada?: number;
  nivelSelecionado?: number;

  pergunta?: IPergunta = undefined;

  userGuid?: string;

  errorMsg?: string;

  selectMateria(e) {
    this.materiaSelecionada = e.target.value;
  }
  selectNivel(e) {
    this.nivelSelecionado = e.target.value;
  }

  getSchema(): void {
    fetch(`${environment.apiRootUrl}/perguntas/schema`)
      .then((res) => res.json())
      .then((data: IControlesSchema) => {
        this.controlesSchema = data;
      })
      .catch(
        (e: Error) => (this.errorMsg = 'Error Accessing API: ' + e.message)
      );
  }

  getQuestion(): void {
    const queryString = `${environment.apiRootUrl}/perguntas/?materia=${this.materiaSelecionada}&nivel=${this.nivelSelecionado}`;
    fetch(queryString)
      .then((res) => res.json())
      .then((data: IPergunta) => {
        this.pergunta = data;
      })
      .catch(
        (e: Error) =>
          (this.errorMsg = 'Error retrieving Question: ' + e.message)
      );
  }

  respostaEvent(e): void {
    console.log(e);
  }

  ngOnInit() {
    this.getSchema();
    const guid = localStorage.getItem('guid');
    if (guid) {
      this.userGuid = guid;
    } else {
      fetch(`${environment.apiRootUrl}/guid`)
        .then((res) => res.text())
        .then((data) => {
          const guidPattern = new RegExp(
            '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$',
            'i'
          );
          if (guidPattern.test(data)) {
            this.userGuid = data;
            localStorage.setItem('guid', this.userGuid);
          } else {
            throw new Error('Invalid GUID received!');
          }
        });
    }
  }

  ngOnDestroy(): void {}
}

interface IControlesSchema {
  Materias: string[];
  Niveis: string[];
}
