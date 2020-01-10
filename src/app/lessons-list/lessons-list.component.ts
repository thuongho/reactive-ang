import { Component } from '@angular/core';
import { globalEventBus, Observer, ADD_NEW_LESSON, LESSONS_LIST_AVAILABLE } from '../event-bus-experiments/event-bus';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.scss']
})
// implements Observer to use notify
export class LessonsListComponent implements Observer {

  // problem lesson owns a copy of the lessons list
  lessons: Lesson[] = [];
  loadingLessons: boolean;

  // register in the constructor as register in oninit it will not get the data
  constructor() {
    console.log('lesson list component is registered as observer...')
    // register the component itself and listening to lessons list
    globalEventBus.registerObserver(LESSONS_LIST_AVAILABLE, this);

    globalEventBus.registerObserver(ADD_NEW_LESSON, {
      notify: lessonText => {
        this.lessons.push({
          id: Math.random(),
          description: lessonText
        });
      }
    });
  }

  notify(data: Lesson[]) {
    console.log('LessonsListComponent received lessons data');
    // shallow copy of the data
    this.lessons = data.slice(0);
  }

  select(data: any) {

  }

  // this method updates the copy of the lesson and not the observable list
  toggleLessonViewed(lesson: Lesson) {
    console.log('toggling lesson...');
    lesson.completed = !lesson.completed;
  }

}
