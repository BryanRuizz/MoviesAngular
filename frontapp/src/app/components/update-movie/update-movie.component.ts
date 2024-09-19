import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-update-movie',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent {
  @Input() isVisible: boolean = false;
  @Input() item: any = { id: '', title: '', synopsis: '', actors: [], categories: [], image: '' };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSave() {
   
    if (typeof this.item.actors === 'string') {
      this.item.actors = this.item.actors.split(',').map((actor: string) => actor.trim());
    }

    if (typeof this.item.categories === 'string') {
      this.item.categories = this.item.categories.split(',').map((category: string) => category.trim());
    }
    this.save.emit(this.item);
    this.isVisible = false;
  }

  onCancel() {
    this.cancel.emit();
    this.isVisible = false;
  }
}
