import { async, TestBed } from '@angular/core/testing';
import { UiGuideModule } from './ui-guide.module';

describe('UiGuideModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiGuideModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiGuideModule).toBeDefined();
  });
});
