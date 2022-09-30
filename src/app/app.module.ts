import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PerguntaComponent } from './components/pergunta/pergunta.component';
import { IndexComponent } from './pages/index/index.component';
import { PerguntaService } from './services/pergunta.service';
import { LogoComponent } from './components/logo/logo.component';
import { ControlesComponent } from './components/controles/controles.component';
import { AlternativaComponent } from './components/alternativa/alternativa.component';

@NgModule({
  declarations: [AppComponent, PerguntaComponent, IndexComponent, LogoComponent, ControlesComponent, AlternativaComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [PerguntaService],
  bootstrap: [AppComponent],
})
export class AppModule {}
