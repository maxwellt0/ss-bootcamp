import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [SpinnerService, SpinnerInterceptor]
})
export class CoreModule { }
