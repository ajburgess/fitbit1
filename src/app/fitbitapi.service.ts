import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FitbitapiService {

  private userId;
  private accessToken;

  constructor(private http: HttpClient) { }

  isSignedIn() {
    return this.userId != undefined && this.accessToken != undefined;
  }

  signOut() {
    this.userId = undefined;
    this.accessToken = undefined;
  }

  setUserIdAndAccessToken(userId, accessToken) {
    this.userId = userId;
    this.accessToken = accessToken;
  }

  getOAuth2Url() {
    const clientId = "22BLVM"; // Obtained when we registered this app at dev.fitbit.com
    const scope = "activity"; // What permission(s) we're asking for
    const expiry = 31536000; // One year
    const prompt = "consent"; // Force user to agree, even if already done so before
    const url = `https://www.fitbit.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=${scope}&expires_in=${expiry}&prompt=${prompt}`;
    return url;
  }

  async getDailyActivitySummary(date) {
    // Include the user's access token in the HTTP request 
    const header = { 'Authorization': `Bearer ${this.accessToken}` };
    const options = { headers: header };
    const url = `https://api.fitbit.com/1/user/-/activities/date/${formatDate(date, 'yyyy-MM-dd', 'en-gb')}.json`;
    const summary = await this.http.get<any>(url, options).toPromise();
    return summary;
  }
}
