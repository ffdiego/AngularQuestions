import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IControlesSchema } from '../models/IControlesSchema';
import { IPergunta } from '../models/IPergunta';
import { Materias } from '../shared/enums/Materias.enum';
import { Niveis } from '../shared/enums/Niveis.enum';

@Injectable({
  providedIn: 'root',
})
export class PerguntaService {
  private Pergunta: IPergunta;

  constructor() {}

  getQuestion(materia: Materias, nivel: Niveis): Promise<IPergunta> {
    return fetch(
      `${environment.apiRootUrl}/perguntas/?materia=${materia}&nivel=${nivel}`
    ).then((res) => res.json());
  }
  getSchema(): Promise<IControlesSchema> {
    return fetch(`${environment.apiRootUrl}/perguntas/schema`).then((res) =>
      res.json()
    );
  }
}
