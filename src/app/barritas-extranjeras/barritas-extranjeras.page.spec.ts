import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarritasExtranjerasPage } from './barritas-extranjeras.page';

describe('BarritasExtranjerasPage', () => {
  let component: BarritasExtranjerasPage;
  let fixture: ComponentFixture<BarritasExtranjerasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BarritasExtranjerasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
