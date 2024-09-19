import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceService } from './service/service.service';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component'; 
import { FormsModule } from '@angular/forms'; 
import { CreateMovieComponent } from './components/create-movie/create-movie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UpdateMovieComponent, FormsModule,CreateMovieComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})

export class AppComponent implements OnInit {
  title = 'frontapp';
  Idd: number = 0;
  ban: boolean = true;
  modalupdate = false;
  modalcreate = false;
  data: any[] = [];
  filteredData: any[] = [];
  currentItem: any = { id: 0, name: '', favorite: false };
  searchTerm: string = '';

  constructor(private apiservice: ServiceService) { }

  ngOnInit(): void {
    this.getdata(); 
  }


  getdata() {
    this.Idd=0;
    this.apiservice.getdata().subscribe(data => {
      this.data = data.data;
      // console.log("tiene o no data", this.data);

      this.filteredData = this.data;
      // this.filterItems(); 
    });
  }

  // handle selected item
  card(id: number) {
    if (id === this.Idd) {
      this.Idd = 0;
    } else {
      this.Idd = id;
    }
  }

  deleteitem(id: number) {
    // console.log(id,"idid");
    this.apiservice.deleteData(id).subscribe(response => {
      // console.log("Item deleted successfully", response);
      this.Idd=0;
      this.getdata(); 
      this.card(this.Idd)
    }, error => {
      console.error("Error deleting item", error);
    });
  }

  // handle view model updated
  updateview(listen: boolean) {
    this.currentItem = this.data.find((item) => item._id === this.Idd) || { id: '', title: '', synopsis: '', actors: [], categories: [], image: '' };
    // console.log(this.currentItem);
    this.modalupdate = listen;
  }

  // handle view create modal
  createtvshow(listen: boolean) {
    this.modalcreate = listen;
    // console.log('Modal Create Open:', this.modalcreate); // Verifica en la consola
  
  }

  handlecreate(item: any) {
    // console.log(item);
    this.apiservice.createData(item).subscribe(response => {
      // console.log("Item created successfully", response);
      this.getdata(); 
    }, error => {
      alert("Verify Endpoint");
      console.error("Error creating item", error);
    });
    this.modalcreate = false; 
  }

  handleupdate(item: any) {
    // console.log("put",this.Idd,item);
    this.apiservice.updateData(this.Idd,item).subscribe(response => {
      // console.log("Item updated successfully", response);

      this.getdata();
    }, error => {
      console.error("Error updating item", error);
    });
    this.modalcreate = false; 
    this.getdata();
  }

  // start-> handle view update and create just for show or hide
  updatecancel() {
    this.modalupdate = false;
  }

  createcancel() {
    this.modalcreate = false;
  }
  // end  

  filterItems() {
    this.filteredData = this.data.sort((a, b) => a.title.localeCompare(b.title));

    // console.log("bla bla", this.filteredData);
  }

}
