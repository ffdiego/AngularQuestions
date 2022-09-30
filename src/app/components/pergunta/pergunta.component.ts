import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IPergunta } from 'src/app/models/IPergunta';

@Component({
  selector: 'app-pergunta',
  templateUrl: './pergunta.component.html',
  styleUrls: ['./pergunta.component.scss'],
})
export class PerguntaComponent implements OnInit {
  @Input() pergunta: IPergunta;
  @Output() respostaEvent = new EventEmitter<string>();

  ngOnInit(): void {
    console.log(this.pergunta);
  }

  responder(n: string) {
    this.respostaEvent.emit(n);
  }
}
