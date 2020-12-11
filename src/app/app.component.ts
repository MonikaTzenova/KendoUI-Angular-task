import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('personsList', { static: true }) personsList: ElementRef;
  @ViewChild('clearButton', { static: true }) clearButton: ElementRef;
  @ViewChild('newPerson', { static: true }) newPerson: ElementRef;

  name = new FormControl('');
  persons = [
    {name: 'Mr. Zero' },
    {name: 'Mr. Nice' },
    {name: 'Ms. Test' },
    {name: 'John Test' },
    {name: 'Peter Parker' },
    {name: 'Supermen' },
    {name: 'Ms. Petrova' },
    {name: 'Dr. Hi' },
    {name: 'Dr IQ' },
    {name: 'Mr. Json' },
  ];

  myForm: FormGroup;
  arrowkeyLocation;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.persons.reverse();
  }

  private createForm(): void {
    this.myForm = this.fb.group({
      name: ' '
    });
  }

  resetForm(): void {
    this.myForm.get('name').patchValue('');
  }

  addPerson(newPerson: string): void {
    if (newPerson) {
      this.arrowkeyLocation = 0;
      this.persons.splice(0, 0, {name: newPerson});
      this.myForm.get('name').patchValue(this.persons[0].name);
      this.persons.pop();
    }
  }

  onBlur(): void {
    this.resetForm();
    this.personsList.nativeElement.style.display = 'none';
    this.removePersonsListSelectedElements();
  }

  removePersonsListSelectedElements(): void {
    const placeholders = this.personsList.nativeElement.querySelectorAll('.selected');
    if (placeholders.length !== 0) {
      placeholders[0].className = '';
    }
  }

  onFocus(): void {
    this.arrowkeyLocation = 0;
    this.myForm.get('name').patchValue(this.persons[0].name);
    this.personsList.nativeElement.style.display = 'block';
    this.showClearButton();
  }

  removeClick(): void {
      this.personsList.nativeElement.style.display = 'block';
      this.newPerson.nativeElement.focus();
      this.resetForm();
      this.removePersonsListSelectedElements();
      this.showClearButton();
  }

  onDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        if (this.arrowkeyLocation > 0) {
          this.arrowkeyLocation--;
          this.myForm.get('name').patchValue(this.persons[this.arrowkeyLocation].name);
        }
        break;
      case 'ArrowDown':
        if (this.arrowkeyLocation < 9) {
          this.arrowkeyLocation++;
          this.myForm.get('name').patchValue(this.persons[this.arrowkeyLocation].name);
        }
        break;
    }
  }

  showClearButton(): void {
    const inputValue = this.myForm.get('name').value;
    this.clearButton.nativeElement.style.visibility = ((inputValue !== '')) ? 'visible' : 'hidden';
  }
}
