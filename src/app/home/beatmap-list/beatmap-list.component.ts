import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { BeatmapListService } from './beatmap-list.service';


@Component({
  selector: 'app-beatmap-list',
  templateUrl: './beatmap-list.component.html',
  styleUrls: ['./beatmap-list.component.css']
})
export class BeatmapListComponent implements OnInit {

  constructor(private beatmapListService: BeatmapListService) { }

  ngOnInit(): any {
    this.beatmapListService.setNewBeatmaps(this.beatmapListService.getInitialBeatmaps());
  }

  // Responsible for grabbing the initial beatmaps from the server. See: BeatmapListSerivce.getInitialBeatmaps();
  getBeatmapsOnLoad() {
    return this.beatmapListService.getInitialBeatmaps();
  }

}
