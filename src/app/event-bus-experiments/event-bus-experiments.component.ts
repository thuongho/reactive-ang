import { Component, OnInit } from '@angular/core';
// use globalEventBus as a communication mechanism
import { globalEventBus } from './event-bus';
import { testLessons } from '../shared/model/test-lessons';

@Component({
  selector: 'event-bus-experiments',
  templateUrl: './event-bus-experiments.component.html',
  styleUrls: ['./event-bus-experiments.component.scss']
})
export class EventBusExperimentsComponent implements OnInit {



  ngOnInit() {
    console.log('Top level component broadcasted all lessons...');
    // broadcast testLessons to any observer that needs testLessons
    // EventBusExperimentsComponent doesn't have access to any other components
    // it's only using the globalEventBus to distribute data
    globalEventBus.notifyObservers(testLessons);
  }

  addLesson(value) {}

}
