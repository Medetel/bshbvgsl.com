import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms-form',
  templateUrl: './sms-form.component.html',
  styleUrls: ['./sms-form.component.css']
})
export class SmsFormComponent implements OnInit {
  title="Location based SMS";
  constructor() { }

  ngOnInit() {
  }

}
