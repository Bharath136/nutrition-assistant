import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-suggestions',
  templateUrl: './previous-suggestions.component.html',
  styleUrls: ['./previous-suggestions.component.css']
})
export class PreviousSuggestionsComponent {

  mySuggestions: any[] = [];

  constructor(private http: HttpClient, private route:Router) {
    const token = localStorage.getItem('jwtToken')
    if(!token){
      this.route.navigate(['/login'])
    }
    this.http.get<any[]>('http://localhost:5100/suggestions').subscribe(
      (res: any[]) => {
        console.log(res);
        this.mySuggestions = res;
      },
      (error: any) => {
        console.error('Failed to fetch suggestions:', error);
        // Handle the error if needed
      }
    );
  }

}
