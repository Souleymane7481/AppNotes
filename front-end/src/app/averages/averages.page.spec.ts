import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AveragesPage } from './averages.page';

describe('AveragesPage', () => {
  let component: AveragesPage;
  let fixture: ComponentFixture<AveragesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AveragesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
