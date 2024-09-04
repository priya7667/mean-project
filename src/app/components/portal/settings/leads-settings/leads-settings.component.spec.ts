import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsSettingsComponent } from './leads-settings.component';

describe('LeadsSettingsComponent', () => {
  let component: LeadsSettingsComponent;
  let fixture: ComponentFixture<LeadsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadsSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
