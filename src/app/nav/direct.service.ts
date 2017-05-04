import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class DirectService {

  // Holds all the possible direct link criteria that we support
  private directLinks: string[] = [
        "osu.ppy.sh/b/",
        "osu.ppy.sh/s/",
        "new.ppy.sh/s/",
        "new.ppy.sh/b/",
        "104.20.52.28/s/",
        "104.20.52.28/b/",
        "ripple.moe/b/",
        "ripple.moe/s/"       
    ];

  constructor(private http: Http) { }

  // Responsible for downloading links given in the direct download form
  directDownload(beatmap: string) {

    // Check if the link given is valid and return an error if it isn't.
    let validLink = this.checkValidLink(beatmap);
    if (!validLink) return false;

    // Remove mode indentifier from URL if it exists
    if (beatmap.includes('&')) beatmap = beatmap.substring(0, beatmap.indexOf('&m'));
    console.log(beatmap);  

    if (beatmap.includes('/s/')) return this.downloadFromSetId(beatmap);
    if (beatmap.includes('/b/')) return this.downloadFromBeatmapId(beatmap);     
  }

  // Checks if the beatmap link the user provided is valid. See: directLinks for the list of links that is supported.
  checkValidLink(beatmap: string) {
    for (let i = 0; i < this.directLinks.length; i++) {
        if (beatmap.includes(this.directLinks[i])) {
            return true;
        }
    }
  }

  // Downloads the beatmap if the user provided an /s/ link
  downloadFromSetId(beatmap: string): boolean {
    console.log('Downloading beatmap:', beatmap);

    // Extract the beatmapSetId from the url given
    const beatmapSetId: string = beatmap.substring(beatmap.indexOf('/s/') + 3);

    // Check for invalidity with the beatmapSetId given and return a downloadSuccess of false
    if (beatmapSetId == "" || beatmapSetId.includes(' ')) return false;

    // Check if the beatmap is on Ripple's mirror
    this.http.get(`/api/direct/s?id=${beatmapSetId}`).subscribe(
      data => { 
        const beatmapData = data.json();
        console.log(beatmapData.status);
        // Download the beatmap and return found!
        if (!beatmapData.error) {
          return window.location.replace(`http://storage.ripple.moe/${beatmapSetId}.osz`);     
        } 
        if (beatmapData.status == 400) return false;
      }
    );

  }

  // Downloads the beatmap if the user provided an /b/ link
  downloadFromBeatmapId(beatmap: string): boolean {
    console.log('Downloading beatmap:', beatmap);

    // Extract the beatmapSetId from the url given
    const beatmapId: string = beatmap.substring(beatmap.indexOf('/b/') + 3);

    // Check for invalidity with the beatmapSetId given and return a downloadSuccess of false
    if (beatmapId == "" || beatmapId.includes(' ')) return false;

    // Check if the beatmap is on Ripple's mirror
    this.http.get(`/api/direct/b?id=${beatmapId}`).subscribe(
      data => { 
        const beatmapData = data.json();
        console.log(beatmapData);
        // Download the beatmap and return found!
        if (!beatmapData.error) {
          window.location.replace(`http://storage.ripple.moe/${beatmapData.data.ParentSetID}.osz`);     
        } 
        if (beatmapData.status == 400) return false;
      }    
    );
  } 
}
