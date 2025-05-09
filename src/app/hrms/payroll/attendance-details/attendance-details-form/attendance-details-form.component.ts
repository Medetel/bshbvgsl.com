import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-details-form',
  templateUrl: './attendance-details-form.component.html',
  styleUrls: ['./attendance-details-form.component.css']
})
export class AttendanceDetailsFormComponent implements OnInit {

  title="Add Employee Attendance Details";
  constructor() { }

  ngOnInit() {
  }

}
