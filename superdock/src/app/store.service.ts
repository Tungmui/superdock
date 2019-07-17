import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  state = {
    plans: [],
    nodes: [],
    userInfo: {}
  }

  getters: any = {

  }

}
