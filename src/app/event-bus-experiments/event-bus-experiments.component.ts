import { Component, OnInit } from '@angular/core';
// use globalEventBus as a communication mechanism
import { store } from './app-data';
import { testLessons } from '../shared/model/test-lessons';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
// top level component
export class EventBusExperimentsComponent implements OnInit {

  ngOnInit() {
    console.log('Top level component broadcasted all lessons...');
    // simulate getting testLessons from the backend
    store.initializeLessonsList(testLessons.slice(0));

    // simulated server push functionality
    setTimeout(() => {
      const newLesson = {
        id: Math.random(),
        description: 'New lesson arriving from the backend'
      };

      // TODO
    }, 10000);
  }

  addLesson(lessonText: string) {
    // TODO
  }

}
