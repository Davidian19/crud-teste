import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  providers: [],
})
export class AppModule {}

bootstrapApplication(AppModule).catch((err) => console.error(err));
