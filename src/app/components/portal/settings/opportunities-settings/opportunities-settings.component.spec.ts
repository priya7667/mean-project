import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesSettingsComponent } from './opportunities-settings.component';

describe('OpportunitiesSettingsComponent', () => {
  let component: OpportunitiesSettingsComponent;
  let fixture: ComponentFixture<OpportunitiesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunitiesSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
