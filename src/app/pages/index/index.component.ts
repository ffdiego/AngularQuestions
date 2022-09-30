import { Component, OnInit } from '@angular/core';
import { IControlesSchema } from 'src/app/models/IControlesSchema';
import { IPergunta } from 'src/app/models/IPergunta';
import { PerguntaService } from 'src/app/services/pergunta.service';
import { Materias } from 'src/app/shared/enums/Materias.enum';
import { Niveis } from 'src/app/shared/enums/Niveis.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private perguntaService: PerguntaService) {}

  controlesSchema?: IControlesSchema;

  pergunta?: IPergunta = undefined;
  userGuid?: string;

  async getSchema(): Promise<IControlesSchema> {
    return await this.perguntaService.getSchema().catch((e: Error) => {
      throw new Error('Error accessing the API');
    });
  }

  async getQuestion(materia, nivel) {
    if (!materia || !nivel) return;
    this.pergunta = await this.perguntaService.getQuestion(materia, nivel);
  }

  respostaEvent(e) {
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
