import { Config } from "../configs/config";

export abstract class BasePage {

  private readonly _jsonItems: any;

  get jsonItems(){
    return this._jsonItems;
  }

  protected constructor() {
    this._jsonItems = sessionStorage.getItem(Config.JSON_STORAGE_KEY);
  }
}
