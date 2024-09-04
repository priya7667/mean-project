import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownSettingsComponent } from './drop-down-settings.component';

describe('DropDownSettingsComponent', () => {
  let component: DropDownSettingsComponent;
  let fixture: ComponentFixture<DropDownSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropDownSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropDownSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
