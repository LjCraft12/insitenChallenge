import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TargetComponent } from './components/target/target.component';
import { TargetsComponent } from './components/targets/targets.component';
import {TargetService} from './services/target.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TargetComponent,
    TargetsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TargetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
