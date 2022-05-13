import { Config } from "../configs/config";
import { StudentDataModel } from "../models/student-data.model";

export abstract class BasePage {

  private readonly _studentsData: Map<number, StudentDataModel>;

  get studentsData(){
    return this._studentsData;
  }

  protected constructor() {
    this._studentsData = new Map();
    let ob = JSON.parse(sessionStorage.getItem(Config.STUDENTS_DATA_STORAGE_KEY) || '{}');
    for(let key in ob) this._studentsData.set(+key, ob[key]);
  }

  toFixed(num: number, pos: number){
    return num.toFixed(pos);
  }
}
