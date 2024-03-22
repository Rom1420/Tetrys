import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfilButtonComponent } from './add-profil-button.component';

describe('AddProfilButtonComponent', () => {
  let component: AddProfilButtonComponent;
  let fixture: ComponentFixture<AddProfilButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProfilButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddProfilButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
