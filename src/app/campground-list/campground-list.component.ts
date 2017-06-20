import { Component, OnInit } from '@angular/core';
import { CampgroundService } from './../campground.service';

import xml2js from 'xml2js';

@Component({
  selector: 'app-campground-list',
  templateUrl: './campground-list.component.html',
  styleUrls: ['./campground-list.component.css'],
  providers: [CampgroundService]
})
export class CampgroundListComponent implements OnInit {
  apiUrlDetail = 'http://api.amp.active.com/camping/campground/details?contractCode=NRSO&parkId=72382&api_key=49ecq3g6gesegbetsvkpr23r'
  apiUrlSearch = 'http://api.amp.active.com/camping/campgrounds?landmarkName=true&landmarkLat=45.5231&landmarkLong=-122.6765&xml=true&api_key=49ecq3g6gesegbetsvkpr23r';
  camps;

  constructor(private cs: CampgroundService) { }

  ngOnInit() {
  }

  getCamps() {
    let returnedCamps = this.cs.getCampsApi(this.apiUrlSearch);

    xml2js.parseString( returnedCamps.text(), (err, result) => {
      this.camps = result.resultset.result; // JSON object!
    });
    console.log(this.camps);
  }

}
