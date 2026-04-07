import { Component } from '@angular/core';
import { AngelNameGeneratorService, Tradition, Domain, SuffixFilter, GeneratedAngel } from './angel-name-generator.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  tradition: Tradition = 'all';
  domain: Domain = 'any';
  suffixFilter: SuffixFilter = 'any';
  count = 10;
  results: GeneratedAngel[] = [];

  traditions: Tradition[] = ['hebrew','christian','islamic','enochian','all'];
  domains: Domain[] = ['any','celestial','nature','divine','concepts','geography','time','hidden','war','healing'];
  suffixes: SuffixFilter[] = ['el','iel','on','il','ail','eel','none','any'];

  constructor(private svc: AngelNameGeneratorService) {}

  generate() {
    this.results = this.svc.generate({ tradition: this.tradition, domain: this.domain, suffixFilter: this.suffixFilter, count: this.count });
  }
}
