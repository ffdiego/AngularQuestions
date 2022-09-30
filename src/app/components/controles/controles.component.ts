import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IControlesSchema } from 'src/app/models/IControlesSchema';
import { Materias } from 'src/app/shared/enums/Materias.enum';
import { Niveis } from 'src/app/shared/enums/Niveis.enum';

@Component({
  selector: 'app-controles',
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.scss'],
})
export class ControlesComponent implements OnInit {
  @Input() controleSchema: IControlesSchema;
  @Output() getQuestionEvent = new EventEmitter<string>();
  materia?: Materias;
  nivel?: Niveis;
  errorMsg?: string;

  selectMateria(e) {
    this.materia = e.target.value;
  }
  selectNivel(e) {
    this.nivel = e.target.value;
  }

  getQuestion() {
    this.getQuestionEvent.emit();
  }

  ngOnInit(): void {}
}
