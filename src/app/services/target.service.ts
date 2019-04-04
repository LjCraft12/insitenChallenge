import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Target} from '../models/Target';
import {Observable} from 'rxjs';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  targets: Target[];

  private targeSource = new BehaviorSubject<Target>({
    id: null, status: null, name: null, location: null,
    contact: null, performance: null, revenue: null
  });
  selectedTarget = this.targeSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.targeSource.asObservable();

  constructor() {
    this.targets = [
      {id: 1, status: 'None', name: 'onClick', location: 'USA', contact: 'PCra', performance: 'None', revenue: 300},
      {id: 2, status: 'Researching', name: 'Purity Spa', location: 'USA', contact: 'Chasit', performance: 'High Volume', revenue: 300000},
    ];
  }

  getTargets(): Observable<Target[]> {
    if (localStorage.getItem('targets') === null) {
      this.targets = [];
    } else {
      this.targets = JSON.parse(localStorage.getItem('targets'));
    }
    return of(this.targets.sort((a, b) => {
      return b.revenue = a.revenue;
    }));
  }
  setFormTarget(target: Target) {
    this.targeSource.next(target);
  }
  addTarget(target: Target) {
    this.targets.unshift(target);
    // Adding local storage
    localStorage.setItem('targets', JSON.stringify(this.targets));
  }
  updateTarget(target: Target) {
    this.targets.forEach((current, index) => {
      if (target.id === current.id) {
        this.targets.splice(index, 1);
      }
    });
    this.targets.unshift(target);
    // Add the updated log to local storage
    localStorage.setItem('targets', JSON.stringify(this.targets));
  }
  deleteTarget(target: Target) {
    this.targets.forEach((current, index) => {
      if (target.id === current.id) {
        this.targets.splice(index, 1);
      }
    });
    // Delete Target
    localStorage.setItem('targets', JSON.stringify(this.targets));
  }
  clearState() {
    this.stateSource.next(true);
  }
}
