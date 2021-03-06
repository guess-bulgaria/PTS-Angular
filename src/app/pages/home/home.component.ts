import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Config } from '../../configs/config';
import { StudentDataModel } from "../../models/student-data.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  readonly idRegex = /'([0-9]+)'/g;

  constructor() {
  }

  ngOnInit() {
    this.uploadedFileNames = JSON.parse(sessionStorage.getItem(Config.UPLOADED_FILES_KEY) || '[]');
    this.studentsData = JSON.parse(sessionStorage.getItem(Config.STUDENTS_DATA_STORAGE_KEY) || '{}');
    this.values = Object.values(this.studentsData);
  }

  uploadedFileNames: String[] = [];
  studentsData?: any;
  values: any[] = [];

  clear(){
    this.studentsData = {};
    this.uploadedFileNames = [];
    sessionStorage.setItem(Config.STUDENTS_DATA_STORAGE_KEY, JSON.stringify(this.studentsData));
    sessionStorage.setItem(Config.UPLOADED_FILES_KEY, JSON.stringify(this.uploadedFileNames));
    this.values = Object.values(this.studentsData);
  }

  getNumberFromDescription(description: string, position: number): number {
    let match = [...description.matchAll(this.idRegex)];
    if (match.length == 0) throw new Error();
    return +match[position][1];
  }

  uploadFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    for (let i = 0; i < target.files.length; i++) {
      let index;
      if ((index = this.uploadedFileNames.indexOf(target.files[i].name)) != -1) {
        this.uploadedFileNames.splice(index, 1);
      }
      this.uploadedFileNames.push(target.files[i].name)

      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[i]);
      reader.onload = (e: any) => {
        const wb: XLSX.WorkBook = XLSX.read(e.target.result, {type: 'binary'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
        const data: any[] = XLSX.utils.sheet_to_json(ws);
        for (const row of data) {
          try {
            let studentId;
            if ((studentId = row['ID']) != undefined) {
              if (this.studentsData[studentId] === undefined)
                this.studentsData[studentId] = new StudentDataModel(studentId);

              this.studentsData[studentId].grade = row['Result'];
            } else {
              if (row['Event context'] == 'Assignment: ?????????????? ???? ?????????????? ???????????? ?? ??????????????' &&
                row['Component'] == 'File submissions' &&
                (row['Event name'] == 'Submission created.' || row['Event name'] == 'Submission updated.')) {
                let description = row['Description'];
                studentId = this.getNumberFromDescription(description, 0);
                if (this.studentsData[studentId] == undefined)
                  this.studentsData[studentId] = new StudentDataModel(studentId);

                this.studentsData[studentId].submitAssignment(this.getNumberFromDescription(description, 1));
              } else if (row['Event context'].startsWith('File: ????????????')) {
                let description = row['Description'];
                studentId = this.getNumberFromDescription(description, 0);
                if (this.studentsData[studentId] == undefined)
                  this.studentsData[studentId] = new StudentDataModel(studentId);

                this.studentsData[studentId].viewLecture(this.getNumberFromDescription(description, 1));
              }
            }
          } catch (_) {
          }
        }

        sessionStorage.setItem(Config.STUDENTS_DATA_STORAGE_KEY, JSON.stringify(this.studentsData));
        sessionStorage.setItem(Config.UPLOADED_FILES_KEY, JSON.stringify(this.uploadedFileNames));
        this.values = Object.values(this.studentsData);
      }
    }
  }
}
