import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css'] 
})
export class CreateMovieComponent {
  @Input() isVisible: boolean = false;
  @Input() item: any = { id: '', title: '', synopsis: '', actors: [], categories: [], image: '' };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
 
    this.item.actors = this.item.actors.split(',').map((actor: string) => actor.trim());
    this.item.categories = this.item.categories.split(',').map((category: string) => category.trim());

    this.save.emit(this.item);
    this.isVisible = false;
  }

  onCancel() {
    this.cancel.emit();
    this.isVisible = false;
  }
}
