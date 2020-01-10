// this observer pattern doesn't scale well in complexity
// yarn add lodash
// yarn add @types/lodash - to get types
import * as _ from 'lodash';

export const LESSONS_LIST_AVAILABLE = 'NEW_LIST_AVAILABLE';

export const ADD_NEW_LESSON = 'ADD_NEW_LESSON';

export interface Observer {
  notify(data: any);
}

// private
interface Subject {
  registerObserver(eventType: string, obs: Observer);
  unregisterObserver(eventType: string, obs: Observer);
  notifyObservers(eventType: string, data: any);
}

class EventBus implements Subject {
  // convert to map
  private observers: {[key: string]: Observer[]} = {};

  // similar to add eventlistener
  registerObserver(eventType: string, obs: Observer) {
    this.observerPerEventType(eventType).push(obs);
  }

  // similar to remove eventListener
  unregisterObserver(eventType: string, obs: Observer) {
    // loop through observers array and remove elem that's same as obs
    _.remove(this.observerPerEventType(eventType), el => el === obs);
  }

  notifyObservers(eventType: string, data: any) {
    // loop through array and notify with data
    this.observerPerEventType(eventType).forEach(obs => obs.notify(data));
  }

  private observerPerEventType(eventType: string): Observer[] {
    const observerPerType = this.observers[eventType];
    if (!observerPerType) {
      this.observers[eventType] = [];
    }
    return this.observers[eventType];
  }
}

// make it global
export const globalEventBus = new EventBus();
