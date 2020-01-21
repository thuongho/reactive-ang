import { Component } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';
import { lessonsList$, Observer } from '../event-bus-experiments/app-data';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
// implements Observer to use notify
export class LessonsListComponent implements Observer {

  // problem lesson owns a copy of the lessons list
  lessons: Lesson[] = [];

  // register in the constructor as register in oninit it will not get the data
  constructor() {
    console.log('lesson list component is registered as observer...')

    lessonsList$.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('LessonsListComponent received lessons data');
    // shallow copy of the data
    this.lessons = data.slice(0);
  }

  // this method updates the copy of the lesson and not the observable list
  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson...');
    lesson.completed = !lesson.completed;
  }

  delete(deleted: Lesson) {
    _.remove(this.lessons,
      lesson => lesson.id === deleted.id);
  }

}
