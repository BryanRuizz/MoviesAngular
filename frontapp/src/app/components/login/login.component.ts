import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() save = new EventEmitter<{ username: string, password: string }>();
  @Input() isVisible: boolean = true;

  username: string = '';
  password: string = '';

  onSave() {
    this.save.emit({ username: this.username, password: this.password });
  }
}
