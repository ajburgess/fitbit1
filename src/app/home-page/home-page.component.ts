import { Component, OnInit } from '@angular/core';
import { FitbitapiService } from '../fitbitapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isSignedIn = false;
  activities = undefined;

  constructor(private fitbit: FitbitapiService) { }

  ngOnInit(): void {
    this.isSignedIn = this.fitbit.isSignedIn();
  }

  signIn() {
    const url = this.fitbit.getOAuth2Url();
    document.location.href = url;
  }

  signOut() {
    this.fitbit.signOut();
    this.isSignedIn = false;
  }

  async getTodaysActivities() {
    const today = new Date();
    const summary = await this.fitbit.getDailyActivitySummary(today);
    this.activities = summary.activities;
  }
}
