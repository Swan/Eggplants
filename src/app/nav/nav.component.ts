import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DirectService } from './direct.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // Form
  directForm: FormGroup;

  // Validation & Download Success
  downloadSuccess: boolean;
  formSubmitted: boolean;

  constructor(private directService: DirectService, private appService: AppService) { }

  ngOnInit() {
      // Create the form group
      this.directForm = new FormGroup({
        beatmap: new FormControl('')
      });
  }

  // Download the beatmap on click
  onSubmit(beatmap) {
    console.log(beatmap);;
    this.formSubmitted = true;
    this.downloadSuccess = this.directService.directDownload(beatmap);
    console.log('Download Success', this.downloadSuccess);
  }

}
