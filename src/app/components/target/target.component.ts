import { Component, OnInit } from '@angular/core';
import {TargetService} from '../../services/target.service';
import {Target} from '../../models/Target';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.css']
})
export class TargetComponent implements OnInit {
  id: number;
  status: string;
  name: string;
  location: string;
  contact: string;
  performance: string;
  revenue: number;

  isNew: boolean = true;
  constructor(private targetService: TargetService) { }

  ngOnInit() {
    // Subscribe to target Observable
    this.targetService.selectedTarget.subscribe(target => {
      if (target.status !== null) {
        this.isNew = false;
        this.id = target.id;
        this.status = target.status;
        this.name = target.name;
        this.location = target.location;
        this.contact = target.contact;
        this.performance = target.performance;
        this.revenue = target.revenue;
      }
    });
  }

  onSubmit() {
    // Check for new log
    if (this.isNew) {
      // Create new log
      const newTarget = {
        id: this.genId(),
        name: this.name,
        status: this.status,
        location: this.location,
        contact: this.contact,
        performance: this.performance,
        revenue: this.revenue
      };
      // Add new Target
      this.targetService.addTarget(newTarget);
    } else {
      // Create target to update
      const updTarget = {
        id: this.id,
        name: this.name,
        status: this.status,
        location: this.location,
        contact: this.contact,
        performance: this.performance,
        revenue: this.revenue
      };
      // Update Target
      this.targetService.updateTarget(updTarget);
    }
    // Clear form
    this.clearState();
  }
  clearState() {
    this.isNew = true;
    this.id = null;
    this.name = '';
    this.location = '';
    this.contact = '';
    this.performance = '';
    this.revenue = null;
    this.status = '';
    this.targetService.clearState();
  }
  genId() {
    return Math.random();
  }

}
