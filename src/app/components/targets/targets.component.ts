import {Component, OnInit} from '@angular/core';
import {Target} from '../../models/Target';
import {TargetService} from '../../services/target.service';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.css']
})
export class TargetsComponent implements OnInit {
  targets: Target[];
  selectedTarget: Target;
  loaded: boolean = false;

  constructor(private targetService: TargetService) {
  }

  ngOnInit() {
    this.targetService.stateClear.subscribe(clear => {
      if (clear) {
        this.selectedTarget = {
          id: null, status: null, name: null, location: null,
          contact: null, performance: null, revenue: null
        };
      }
    });

    this.targetService.getTargets().subscribe(targets => {
      setTimeout(() => {
      this.targets = targets;
      this.loaded = true;
      }, 2000);
    });
  }

  onSelect(target: Target) {
    this.targetService.setFormTarget(target);
    this.selectedTarget = target;
  }

  onDelete(target) {
    if (confirm('Are you sure you want to delete this projection?')) {
      this.targetService.deleteTarget(target);
    }
  }
}
