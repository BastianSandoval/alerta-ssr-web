import { Component, OnInit } from '@angular/core';
import { BreedProviderService } from '../../../core/providers/breed-provider/breed-provider.service';
import { Dog } from '../../../core/models/dog.model';
import { DogService } from '../../../core/services/dogs/dogs.service';

@Component({
  selector: 'app-table-dogs',
  templateUrl: './table-dogs.component.html',
  styleUrls: ['./table-dogs.component.css']
})
export class TableDogsComponent implements OnInit {

  breeds?: string[];
  dogs?: Dog[];

  constructor(private breedProvider: BreedProviderService, private dogService: DogService) {
    this.dogs = dogService.dog;
   }

  async ngOnInit(): Promise<void> {
    try {
      this.breeds = await this.breedProvider.getBreed();
    } catch (error) {
      console.log(error)
    }
  }
  
  
}
