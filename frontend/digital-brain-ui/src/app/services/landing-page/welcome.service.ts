import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environment/environment";



@Injectable({
    providedIn: 'root'
})
export class WelcomeService {
    private baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getWelcomeMessage(): Observable<string> {
        return this.http.get<string>(`${this.baseUrl}/welcome`);
    }
}
