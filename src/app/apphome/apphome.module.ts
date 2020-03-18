import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApphomeRoutingModule } from './apphome-routing.module';
import { ApphomeComponent } from './apphome.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [ApphomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ApphomeRoutingModule
  ]
})
export class ApphomeModule { }
