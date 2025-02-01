import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

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
  getIdeationResponse(userInput: string): Observable<string> {
    const params = new HttpParams().set('user_input', userInput);
    const url = `${this.baseUrl}/ideation`;
    return this.http.get<string>(url, { params });
  }
}
