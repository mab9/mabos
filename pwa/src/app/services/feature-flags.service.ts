import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SharedService} from "./shared.service";
import {environment} from "../../environments/environment";
import {ApiConstants} from "../constants/api.constants";
import {catchError, shareReplay} from "rxjs";
import {FeatureFlag} from "../model/feature-flag.model";
@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  constructor(
    private http: HttpClient,
    private sharedService : SharedService,
  ) {
  }

  public getAll() {
    return this.http.get<FeatureFlag[]>(environment.backendUrl + ApiConstants.API_FEATURE_FLAGS)
      .pipe(
        catchError(err => this.sharedService.handleError("Could not load feature flags", err)),
        shareReplay()
      )
  }

  public put(item: FeatureFlag) {
    return this.http.put(environment.backendUrl + ApiConstants.API_FEATURE_FLAGS + `/${item.id}`, item)
      .pipe(
        catchError(err => this.sharedService.handleError("Could not update feature flag ", err)),
        shareReplay()
      );
  }
}
