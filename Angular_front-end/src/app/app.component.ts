import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'omnicart';

  constructor(public service: SharedService) {
  }

  searchByKeyword(searchedkeyword: any) {
    this.service.updateSearchedKeyword(searchedkeyword);
  }
}
