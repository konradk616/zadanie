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
  currentEditRecordIndex: number = 0;
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
    position?: Position,
    index?: number
  ) {
    if (name) {
      this.f.fullName.setValue(name);
      this.f.age.setValue(age);
      this.f.fullTime.setValue(isFullTime);
      this.f.position.setValue(position);
      this.editMode = true;
      this.currentEditRecordIndex = index as number;
    }
    this.modal.nativeElement.setAttribute('style', 'display: block');
  }

  closeModal() {
    this.editMode = false;
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
    if (this.editMode) {
      this.records[this.currentEditRecordIndex].name = fullName;
      this.records[this.currentEditRecordIndex].age = age;
      this.records[this.currentEditRecordIndex].isFullTime = fullTime;
      this.records[this.currentEditRecordIndex].position = position;
      this.closeModal();
      return;
    }

    this.records.push({
      name: fullName,
      age: age,
      isFullTime: fullTime,
      position: position,
    });
    this.closeModal();
  }

  editRecord() {}

  deleteRecord(index: number) {
    this.records.splice(index, 1);
  }
}
