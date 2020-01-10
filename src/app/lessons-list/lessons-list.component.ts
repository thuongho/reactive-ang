import { Component } from '@angular/core';
import { globalEventBus, Observer, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
// implements Observer to use notify
export class LessonsListComponent implements Observer {

  lessons: Lesson[];
  loadingLessons: boolean;

  // register in the constructor as register in oninit it will not get the data
  constructor() {
    console.log('lesson list component is registered as observer...')
    // register the component itself
    globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);
  }

  notify(data: Lesson[]) {
    console.log('LessonsListComponent received lessons data');
    this.lessons = data;
  }

  select(data: any) {

  }

}
