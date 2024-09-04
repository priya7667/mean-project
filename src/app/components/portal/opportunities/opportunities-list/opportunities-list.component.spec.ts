import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesListComponent } from './opportunities-list.component';

describe('OpportunitiesListComponent', () => {
  let component: OpportunitiesListComponent;
  let fixture: ComponentFixture<OpportunitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunitiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
