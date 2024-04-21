import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeNetland, Position } from './models/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'zadanie';
  Position = Position;
  records: EmployeeNetland[] = [];
  filteredRecords: EmployeeNetland[] = [];
  editMode: boolean = false;
  @ViewChild('modal') private modal: ElementRef;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      fullTime: [false, Validators.required],
      position: [Position.Junior, Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  openModal(
    name?: string,
    age?: number,
    isFullTime?: boolean,
    position?: Position
  ) {
    if (name) {
      this.f.fullName.setValue(name);
      this.f.age.setValue(age);
      this.f.fullTime.setValue(isFullTime);
      this.f.position.setValue(position);
    }
    this.modal.nativeElement.setAttribute('style', 'display: block');
  }

  closeModal() {
    this.modal.nativeElement.setAttribute('style', 'display: none');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const fullName = this.f.fullName.value;
    const age = this.f.age.value as number;
    const fullTime = this.f.fullTime.value as boolean;
    const position = this.f.position.value;
    this.records.push({
      name: fullName,
      age: age,
      isFullTime: fullTime,
      position: position,
    });
    this.closeModal();
  }

  startEditMode() {}
}
