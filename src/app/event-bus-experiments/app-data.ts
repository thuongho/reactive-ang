// this observer pattern doesn't scale well in complexity
// yarn add lodash
// yarn add @types/lodash - to get types
import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';

export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
  next(data: any);
}

export interface Observable {
  subscribe(obs: Observer);
  unsubscribe(obs: Observer);
}

// private
interface Subject extends Observer, Observable {

}

class SubjectImplementation implements Subject {

  private observers: Observer[] = [];

  next(data: any) {
    // broadcast data to all the observers
    this.observers.forEach(obs => obs.next(data));
  }

  subscribe(obs: Observer) {
    this.observers.push(obs);
  }

  unsubscribe(obs: Observer) {
    _.remove(this.observers, el => el === obs);
  }
}

// $ is a stream of data or an observable
export let lessonsList$: Observable;

// initialize a single instance of lessons
// this takes care of data encapsulation/ data ownership
// other components now use this one instance of lessons
let lessons: Lesson[] = [];

// allow other components to update the one instance of lessons
export function initializeLessonsList(newList: Lesson[]) {
  // make a clone of the newList so that we don't reference another variable somewhere
  lessons = _.cloneDeep(newList);
}
