import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserQuery } from '../models/UserQuery';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root'
})
export class AloryithService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    /**
     * Sends a user input to the /aloryith/generate/location endpoint
     * @param userInput The user's input string
     * @returns An Observable containing the location generation result
     */
    generateLocation(userInput: UserQuery): Observable<string> {
        const url = `${this.baseUrl}/aloryith/generate/location`;
        const payload: UserQuery = userInput;

        const headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http.post<string>(url, payload, { headers });
    }
}
