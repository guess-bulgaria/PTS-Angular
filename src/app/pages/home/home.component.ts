import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { Config } from '../../configs/config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() {
  }

  ngOnInit() {
    this.uploadedFileNames = JSON.parse(sessionStorage.getItem(Config.JSON_UPLOADED_FILES_KEY) || '[]');
  }

  uploadedFileNames: String[] = [];

  uploadFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);

    for (let i = 0; i < target.files.length; i++) {
      let jsonFiles: any = JSON.parse(sessionStorage.getItem(Config.JSON_STORAGE_KEY) || '[]');
      if (!jsonFiles) jsonFiles = [];

      let index;
      if ((index = this.uploadedFileNames.indexOf(target.files[i].name)) != -1){
        this.uploadedFileNames.splice(index, 1);
        jsonFiles.splice(index, 1);
      }
      this.uploadedFileNames.push(target.files[i].name)

      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(target.files[i]);
      reader.onload = (e: any) => {
        const wb: XLSX.WorkBook = XLSX.read(e.target.result, {type: 'binary'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];

        jsonFiles.push(XLSX.utils.sheet_to_json(ws));

        sessionStorage.setItem(Config.JSON_STORAGE_KEY, JSON.stringify(jsonFiles));
        sessionStorage.setItem(Config.JSON_UPLOADED_FILES_KEY, JSON.stringify(this.uploadedFileNames));
      };
    }
  }
}
