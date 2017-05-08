import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

import { BeatmapListService } from '../beatmap-list/beatmap-list.service';
import { BeatmapListComponent } from '../beatmap-list/beatmap-list.component';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../home.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  private searched: boolean;
  private isSubscribed: boolean;

  // ngModel of the game mode. When mode == 4, the key count select field will appear, otherwise it will be hidden
  mode: number = 0;

  constructor(private beatmapListService: BeatmapListService) { 
    this.searched = false;
    // Create FormGroup
    this.searchForm = new FormGroup({
      searchQuery: new FormControl(''),
      rankedStatus: new FormControl('1'),
      gameMode: new FormControl(),
      keys: new FormControl('4')
    })

  }

  ngOnInit() {}

  // Gets the data from the form and sets the new currentBeatmaps
  onSubmit() {
    this.searched = true;
    this.beatmapListService.foundBeatmaps = false;
    
    const gameMode: string = this.searchForm.value.gameMode;
    const keys: string = this.searchForm.value.keys;
    const rankedStatus: string = this.searchForm.value.rankedStatus;
    const searchQuery: string = this.searchForm.value.searchQuery;
    
    this.beatmapListService.setNewBeatmaps(this.beatmapListService.getNewBeatmaps(searchQuery, gameMode, rankedStatus, keys, '0'));
    
  }

}
