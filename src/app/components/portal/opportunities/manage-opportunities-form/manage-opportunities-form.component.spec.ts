import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOpportunitiesFormComponent } from './manage-opportunities-form.component';

describe('ManageOpportunitiesFormComponent', () => {
  let component: ManageOpportunitiesFormComponent;
  let fixture: ComponentFixture<ManageOpportunitiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOpportunitiesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOpportunitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
