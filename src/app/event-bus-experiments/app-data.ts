// this observer pattern doesn't scale well in complexity
// yarn add lodash
// yarn add @types/lodash - to get types
import * as _ from 'lodash';
import { Lesson } from '../shared/model/lesson';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';

export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

// manual create Observer, Observable, Subject
// export interface Observer {
//   next(data: any);
// }

// export interface Observable {
//   subscribe(obs: Observer);
//   unsubscribe(obs: Observer);
// }

// // private
// interface Subject extends Observer, Observable {

// }

// manual code of Subject
// class SubjectImplementation implements Subject {

//   private observers: Observer[] = [];

//   next(data: any) {
//     // broadcast data to all the observers
//     this.observers.forEach(obs => obs.next(data));
//   }

//   subscribe(obs: Observer) {
//     this.observers.push(obs);
//   }

//   unsubscribe(obs: Observer) {
//     _.remove(this.observers, el => el === obs);
//   }
// }

// Store Pattern
// class DataStore implements Observable {
  // central data
  // private lessons: Lesson[] = [];
  // list of subscribed subjects
  // private lessonsListSubject = new SubjectImplementation();
  // there is always a Subject when using Observable

  // observable that components can subscribe to
  // public lessonsList$: Observable = {
  //   subscribe: obs => {
  //     this.lessonsListSubject.subscribe(obs);
  //     obs.next(this.lessons);
  //   },

  //   unsubscribe: obs => this.lessonsListSubject.unsubscribe(obs)
  // };

  // subscribe(obs: Observer) {
  //   this.lessonsListSubject.subscribe(obs);
  //   obs.next(this.lessons);
  // }
  // unsubscribe(obs: Observer) {
  //   this.lessonsListSubject.unsubscribe(obs);
  // }

//   initializeLessonsList(newList: Lesson[]) {
//     this.lessons = _.cloneDeep(newList);
//     // // this will give components the ability to mutilate this.lessons
//     // this.lessonsListSubject.next(this.lessons);
//     // use broadcast instead as it will broadcast a clone that can't mutate the lessons directly
//     this.broadcast();
//   }

//   addLesson(newLesson: Lesson) {
//     // newLesson came from another part of the app
//     // deepClone to make sure DataStore is the new owner of the newLesson
//     this.lessons.push(_.cloneDeep(newLesson));
//     this.broadcast();
//   }

//   deleteLesson(deleted: Lesson) {
//     _.remove(this.lessons,
//       lesson => lesson.id === deleted.id);
//     this.broadcast();
//   }

//   toggleLessonViewed(toggled: Lesson) {
//     // find the lesson
//     const lesson = _.find(this.lessons, item => item.id === toggled.id);

//     // mutate lessons directly, but it is ok as DataStore is the owner of lessons
//     lesson.completed = !lesson.completed;
//     this.broadcast();
//   }

//   broadcast() {
//     // update subjects with a clone of the lessons
//     // broadcast a clone of the store so that component can't mutate it
//     this.lessonsListSubject.next(_.cloneDeep(this.lessons));
//   }
// }

// Store Pattern
class DataStore {
  // central data
  // private lessons: Lesson[] = [];
  // list of subscribed subjects
  // there is always a Subject when using Observable
  // private lessonsListSubject = new Subject();
  // BehaviorSubject remembers previously emited value, provide intitial value empty array
  private lessonsListSubject = new BehaviorSubject([]);

  // observable that components can subscribe to
  public lessonsList$: Observable<Lesson[]> = this.lessonsListSubject.asObservable();

  initializeLessonsList(newList: Lesson[]) {
    console.log('newList', newList);
    this.lessonsListSubject.next(_.cloneDeep(newList));
    console.log('this.lessonsListSubject', this.lessonsListSubject.getValue());
  }

  addLesson(newLesson: Lesson) {
    // newLesson came from another part of the app
    // deepClone to make sure DataStore is the new owner of the newLesson
    const lessons = this.cloneLessons();
    lessons.push(_.cloneDeep(newLesson));
    this.lessonsListSubject.next(lessons);
  }

  deleteLesson(deleted: Lesson) {
    const lessons = this.cloneLessons();
    _.remove(lessons, lesson => lesson.id === deleted.id);
    this.lessonsListSubject.next(lessons);
  }

  toggleLessonViewed(toggled: Lesson) {
    const lessons = this.cloneLessons();
    // find the lesson
    const lesson = _.find(lessons, item => item.id === toggled.id);

    // mutate lessons directly, but it is ok as DataStore is the owner of lessons
    lesson.completed = !lesson.completed;
    this.lessonsListSubject.next(lessons);
  }

  private cloneLessons() {
    // getValue will give array form of lessonsListSubject
    return _.cloneDeep(this.lessonsListSubject.getValue());
  }
}

// make only variable store available to the whole app
export const store = new DataStore();
