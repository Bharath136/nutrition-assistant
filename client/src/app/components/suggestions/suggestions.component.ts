import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent {

  isLoading = false

  suggestions: any = {}

  nutritionForm: FormGroup;

  constructor(private http: HttpClient, private route: Router) {

    const token = localStorage.getItem('jwtToken')
    if(!token){
      this.route.navigate(['/login'])
    }

    this.nutritionForm = new FormGroup({
      age: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      weight: new FormControl(null, Validators.required),
    })
  }

  ngOnInit() {

  }

  onSubmit() {
    if (this.nutritionForm.invalid) {
      return;
    }

    const age = this.nutritionForm.value.age;
    const height = this.nutritionForm.value.height;
    const weight = this.nutritionForm.value.weight;

    this.getSuggestions(age, height, weight)
    // Reset the form
    this.nutritionForm.reset();
  }

  getSuggestions(age: number, height: number, weight: number) {
    const userId = localStorage.getItem('userId');
    // Create an object with the query parameters
    const params = { age: age.toString(), height: height.toString(), weight: weight.toString() };
    // this.isLoading = true
    // Make the HTTP GET request with the query parameters
    this.http.get<any>('http://localhost:5100/suggest-nutrition', { params }).subscribe(
      (res: any) => {
        console.log(res.suggestedNutrition);
        this.suggestions = res.suggestedNutrition;
        console.log(res);
        this.isLoading = true;
        
        const postBody = {
          userId: userId,
          age: age,
          height: height,
          weight: weight,
          suggestions: res.suggestedNutrition,
          bmi: res.bmi
        };

        this.http.post('http://localhost:5100/suggestions', postBody).subscribe((response) => {
          console.log(response);
        });
      },
      (error: any) => {
        console.error('Failed to fetch suggestions:', error);
        this.isLoading = false;
      }
    );
}


}
