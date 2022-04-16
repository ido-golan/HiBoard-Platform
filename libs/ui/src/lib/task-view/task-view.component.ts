import {ChangeDetectionStrategy, Component, Input, NgModule, OnInit} from '@angular/core';
import {MaterialModule} from "@hiboard/ui/material/material.module";
import {Tasks} from "@hiboard/tasks/types/tasks.type";

@Component({
  selector: 'hbd-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewComponent implements OnInit {
  @Input() task: Tasks.Entity;

  constructor() {
  }

  ngOnInit(): void {
  }

}

@NgModule({
  declarations: [TaskViewComponent],
  imports: [MaterialModule],
  exports: [TaskViewComponent]
})
export class TaskViewComponentModule {
}