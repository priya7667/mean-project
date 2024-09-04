import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountFormComponent } from './manage-account-form.component';

describe('ManageAccountFormComponent', () => {
  let component: ManageAccountFormComponent;
  let fixture: ComponentFixture<ManageAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAccountFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
