import { Component, OnInit } from '@angular/core';
// use globalEventBus as a communication mechanism
import { globalEventBus, ADD_NEW_LESSON, LESSONS_LIST_AVAILABLE } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {

  private lessons: Lesson[] = [];

  ngOnInit() {
    console.log('Top level component broadcasted all lessons...');
    this.lessons = testLessons.slice(0);
    // broadcast testLessons to any observer that needs testLessons
    // EventBusExperimentsComponent doesn't have access to any other components
    // it's only using the globalEventBus to distribute data
    // make a copy of testLessons
    globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons);

    // simulated server push functionality
    setTimeout(() => {
      this.lessons.push({
        id: Math.random(),
        description: 'New lesson arriving from the backend'
      });

      globalEventBus.notifyObservers(LESSONS_LIST_AVAILABLE, this.lessons);
    }, 10000);
  }

  addLesson(lessonText: string) {
    globalEventBus.notifyObservers(ADD_NEW_LESSON, lessonText);
  }

}
