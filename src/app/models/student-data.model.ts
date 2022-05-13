export class StudentDataModel {
  id: number;
  uploadedFiles: number = 0;
  lecturesViewed: number[] = [];
  grade?: number;

  constructor(id: number) {
    this.id = id;
  }

  submitAssignment(files: number) {
    this.uploadedFiles = files;
  }

  viewLecture(id: number) {
    if (this.lecturesViewed.includes(id)) return;
    this.lecturesViewed.push(id);
  }
}
