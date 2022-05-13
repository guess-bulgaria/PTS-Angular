export class StudentDataModel {
  id: number;
  hasSubmittedAssignment: boolean = false;
  lecturesViewed: number[] = [];
  grade?: number;

  constructor(id: number) {
    this.id = id;
  }

  submitAssignment() {
    this.hasSubmittedAssignment = true;
  }

  viewLecture(id: number) {
    if (this.lecturesViewed.includes(id)) return;
    this.lecturesViewed.push(id);
  }
}
