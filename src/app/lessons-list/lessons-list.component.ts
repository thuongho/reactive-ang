import { Component, OnInit } from '@angular/core';
import { Lesson } from '../shared/model/lesson';
import * as _ from 'lodash';
import { store } from '../event-bus-experiments/app-data';
import { Observer } from 'rxjs';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
// implements Observer to use notify
export class LessonsListComponent implements Observer<Lesson[]>, OnInit {
  // loadingLessons: boolean;
  // // problem lesson owns a copy of the lessons list
  // this local copy is ok as it is a copy for the dom
  lessons: Lesson[] = [];

  // observable pattern is async, so can subscribe in oninit instead of constructor
  ngOnInit() {
    console.log('lesson list component is registered as observer...');
    store.lessonsList$.subscribe(this);
    // store.subscribe(this);
  }

  next(data: Lesson[]) {
    console.log('LessonsListComponent received lessons data');
    // shallow copy of the data
    this.lessons = data;
    console.log('this.lessons', this.lessons);
  }

  error(err: any) {
    console.log('err', err);
  }

  complete() {
    console.log('completed');
  }

  // this method updates the copy of the lesson and not the observable list
  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson...');
    store.toggleLessonViewed(lesson);
  }

  delete(deleted: Lesson) {
    store.deleteLesson(deleted);
  }

}
