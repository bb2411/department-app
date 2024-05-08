import { Component, OnInit } from '@angular/core';
import { FacultydataService } from './controller/facultydata.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrl: './faculty.component.css'
})
export class FacultyComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(private controller:FacultydataService){}
}
