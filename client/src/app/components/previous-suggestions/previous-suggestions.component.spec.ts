import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousSuggestionsComponent } from './previous-suggestions.component';

describe('PreviousSuggestionsComponent', () => {
  let component: PreviousSuggestionsComponent;
  let fixture: ComponentFixture<PreviousSuggestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousSuggestionsComponent]
    });
    fixture = TestBed.createComponent(PreviousSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
