import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserQuery } from '../../models/UserQuery';


@Injectable({
  providedIn: 'root'
})
export class IdeationService {
  private baseUrl = environment.apiUrl; // e.g. "http://localhost:8001"

  constructor(private http: HttpClient) {}

  /**
   * Sends the ideation query to the backend.
   * The backend endpoint will compute the convergence, divergence, 
   * and then catalyst (final synthesis) response.
   */
  getIdeationResponse(userInput: UserQuery): Observable<string> {
    const url = `${this.baseUrl}/ideation`;
    const payload: UserQuery = userInput;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(url, payload, { headers });
  }


}
