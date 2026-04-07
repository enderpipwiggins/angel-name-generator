import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngelNameGeneratorService } from './angel-name-generator.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [AngelNameGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule {}
