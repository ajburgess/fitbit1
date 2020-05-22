import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FitbitapiService } from '../fitbitapi.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private fitbit: FitbitapiService) { }

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    const params = new URLSearchParams(fragment);
    const access_token = params.get("access_token");
    const user_id = params.get("user_id");
    this.fitbit.setUserIdAndAccessToken(user_id, access_token);
    this.router.navigateByUrl("/home");
  }

}
