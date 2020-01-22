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

// // initialize a single instance of lessons
// // this takes care of data encapsulation/ data ownership
// // other components now use this one instance of lessons
// // other components can not mutate this lessons directly
// // move data to central location
// let lessons: Lesson[] = [];

// // list of Observers of lessonsList will be stored
// // subjects can only subscribe to the observable and not emit events on behalf of the observable
// const lessonsListSubject = new SubjectImplementation();

// // $ is a stream of data or an observable
// // data is access via an observable
// export let lessonsList$: Observable = {
//   // keep track of the subscribers
//   subscribe: obs => {
//     lessonsListSubject.subscribe(obs);
//     // initializeLessonsList was called in Oninit while some components are subscribed in constructor
//     // early subscribers (constructor) will get [] while later subscribers get data from initializedLessonsList
//     // fix timing issue by passing lessons into next
//     obs.next(lessons);
//   },
//   unsubscribe: obs => lessonsListSubject.unsubscribe(obs)
// };

// // allow other components to update the one instance of lessons
// export function initializeLessonsList(newList: Lesson[]) {
//   // make a clone of the newList so that we don't reference another variable somewhere
//   lessons = _.cloneDeep(newList);
//   // notify all the observers
//   lessonsListSubject.next(lessons);
// }

// Store Pattern
class DataStore {
  // central data
  private lessons: Lesson[] = [];
  // list of subscribed subjects
  private lessonsListSubject = new SubjectImplementation();

  // observable that components can subscribe to
  public lessonsList$: Observable = {
    subscribe: obs => {
      this.lessonsListSubject.subscribe(obs);
      obs.next(this.lessons);
    },

    unsubscribe: obs => this.lessonsListSubject.unsubscribe(obs)
  };

  initializeLessonsList(newList: Lesson[]) {
    this.lessons = _.cloneDeep(newList);
    // // this will give components the ability to mutilate this.lessons
    // this.lessonsListSubject.next(this.lessons);
    // use broadcast instead as it will broadcast a clone that can't mutate the lessons directly
    this.broadcast();
  }

  addLesson(newLesson: Lesson) {
    // newLesson came from another part of the app
    // deepClone to make sure DataStore is the new owner of the newLesson
    this.lessons.push(_.cloneDeep(newLesson));
    this.broadcast();
  }

  deleteLesson(deleted: Lesson) {
    _.remove(this.lessons,
      lesson => lesson.id === deleted.id);
    this.broadcast();
  }

  toggleLessonViewed(toggled: Lesson) {
    // find the lesson
    const lesson = _.find(this.lessons, item => item.id === toggled.id);

    // mutate lessons directly, but it is ok as DataStore is the owner of lessons
    lesson.completed = !lesson.completed;
    this.broadcast();
  }

  broadcast() {
    // update subjects with a clone of the lessons
    // broadcast a clone of the store so that component can't mutate it
    this.lessonsListSubject.next(_.cloneDeep(this.lessons));
  }
}

// make only variable store available to the whole app
export const store = new DataStore();
