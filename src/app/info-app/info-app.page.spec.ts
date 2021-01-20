import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoAppPage } from './info-app.page';

describe('InfoAppPage', () => {
  let component: InfoAppPage;
  let fixture: ComponentFixture<InfoAppPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoAppPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoAppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
