import { Config } from "../configs/config";

export abstract class BasePage {

  private readonly _studentsData: any;

  get studentsData(){
    return this._studentsData;
  }

  protected constructor() {
    this._studentsData = sessionStorage.getItem(Config.STUDENTS_DATA_STORAGE_KEY);
  }
}
