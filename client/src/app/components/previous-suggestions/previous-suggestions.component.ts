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

  constructor(private http: HttpClient, private route: Router) {
    const token = localStorage.getItem('jwtToken')
    const userId = localStorage.getItem('userId')
    if (!token) {
      this.route.navigate(['/login'])
    }
    this.http.get<any[]>('http://localhost:5100/suggestions').subscribe(
      (res: any[]) => {
        this.mySuggestions = res.filter((data) => data.userId === userId);
      },
      (error: any) => {
        console.error('Failed to fetch suggestions:', error);
        // Handle the error if needed
      }
    );
  }

  onDelete(id: string) {
    this.http.delete(`http://localhost:5100/suggestion/${id}`).subscribe((res) => {
      alert('deleted')
      const token = localStorage.getItem('jwtToken')
      const userId = localStorage.getItem('userId')
      if (!token) {
        this.route.navigate(['/login'])
      }
      this.http.get<any[]>('http://localhost:5100/suggestions').subscribe(
        (res: any[]) => {
          this.mySuggestions = res.filter((data) => data.userId === userId);
        },
        (error: any) => {
          console.error('Failed to fetch suggestions:', error);
          // Handle the error if needed
        }
      );
    })
  }

}
