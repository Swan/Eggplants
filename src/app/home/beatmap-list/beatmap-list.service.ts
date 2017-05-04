import { Injectable, Output, EventEmitter } from '@angular/core';

import { Http, Response } from '@angular/http'; 
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BeatmapListService {

  constructor(private http: Http) { }

  public currentBeatmaps: Observable<object[]>;
  public offset: string = '0';

  // Responsible for grabbing the initial beatmaps from endpoint: /api/getinitialbeatmaps - Returns 100 ranked osu! beatmaps
  getInitialBeatmaps(): Observable<object[]> {
    return this.http.get('/api/getinitialbeatmaps')
      .map((res: Response) => {
        console.log(res.json());
        return res.json(); 
      })
  }

  // Gets new beatmaps from a user's search - SEE: search.component.ts | onSubmit()
  getNewBeatmaps(searchQuery: string, gameMode: string, rankedStatus: string, keys: string, offset: string): Observable<object[]> {
    return this.http.get(`/api/search?query=${searchQuery}&mode=${gameMode}&status=${rankedStatus}&offset=${offset}&keys=${keys}`)
      .map((res: Response) => {
          console.log(res.json());
          return res.json();     
      })
  }

  // Method for other components to use when setting NEW beatmaps. We're going to distinguish it from appendBeatmaps, because that'll be used for infinite scrolling! 
  setNewBeatmaps(beatmaps: Observable<object[]>) {
    this.currentBeatmaps = beatmaps;
  }

  getBeatmaps(): Observable<object[]> {
    return this.currentBeatmaps;
  }

}
