import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VehiculoComponent } from './vehiculo.component';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { TranslateModule } from '@ngx-translate/core';
import { CoreCommonModule } from '@core/common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';


const routes:Routes=[
  {
    path:"",
    component:VehiculoComponent,
  }
]

@NgModule({
  declarations: [VehiculoComponent],
  imports: [
    RouterModule.forChild(routes),
    ContentHeaderModule,
    TranslateModule,
    CoreCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
})
export class VehiculoModule { }
