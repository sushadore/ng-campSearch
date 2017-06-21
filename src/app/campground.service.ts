import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import xml2js from 'xml2js';
import { campgroundConfig } from './api-keys';

@Injectable()
export class CampgroundService {
  camps;
  constructor (private http: Http) {}

  ngOnInit() {
  }

  getCampsApi(url) {
    return this.http.get(url).map(res => {
      xml2js.parseString( res.text(), (err, result) => {
        this.camps = result.resultset.result; // JSON object!
      });
      return this.camps;
    });
  }

  getCampDetailApi(
    campCode: string,
    campId: string
  ) {
    let url = `http://api.amp.active.com/camping/campground/details?contractCode=${campCode}&parkId=${campId}&api_key=${campgroundConfig.apiKey}`;
    return this.http.get(url).map(res => {
      let camp;
      xml2js.parseString( res.text(), (err, result) => {
        camp = result.detailDescription; // JSON object!
      });
      return camp;
    });
  }


}
