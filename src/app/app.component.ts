import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,  // Add this line
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vaccine-management-frontend';
}
