import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {FormBuilder} from '@angular/forms';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [FormBuilder]
    }).compileComponents()
      .then(() => {
        const fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have to keep the length of newPerson array to be 10`, () => {
    const newPerson = 'Mr. Test';
    component.addPerson(newPerson);
    expect(component.persons.length).toBe(10);
    expect(component.arrowkeyLocation).toBe(0);
  });

  it('should set display none on blur', () => {
    component.onBlur();
    expect(component.personsList.nativeElement.style.display).toBe('none');
  });

  it('should set display block on focus', () => {
    component.onFocus();
    expect(component.personsList.nativeElement.style.display).toBe('block');
  });

  it('should move arrow up, when arrow up is pressed', () => {
    component.arrowkeyLocation = 1;
    const keyEventData = { isTrusted: true, key: 'ArrowUp' };
    const keyEvent = new KeyboardEvent('keyup', keyEventData);
    component.onDown(keyEvent);
    expect(component.arrowkeyLocation).toBe(0);
  });

  it('should move arrow down, when arrow down is pressed', () => {
    component.arrowkeyLocation = 1;
    const keyEventData = { isTrusted: true, key: 'ArrowDown' };
    const keyEvent = new KeyboardEvent('keydown', keyEventData);
    component.onDown(keyEvent);
    expect(component.arrowkeyLocation).toBe(2);
  });
});
