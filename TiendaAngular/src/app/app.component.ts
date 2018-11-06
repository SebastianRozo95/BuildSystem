import { Component } from '@angular/core';
import { NavComponent } from './nav/nav.component';
import { CompraService } from './compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hellow!';

  getStyle() {
      return "yellow";
  }

}
