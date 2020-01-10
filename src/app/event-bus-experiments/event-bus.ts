// this observer pattern doesn't scale well in complexity
// yarn add lodash
// yarn add @types/lodash - to get types
import * as _ from 'lodash';

export interface Observer {
  notify(data: any);
}

// private
interface Subject {
  registerObserver(obs: Observer);
  unregisterObserver(obs: Observer);
  notifyObservers(data: any);
}

class EventBus implements Subject {
  private observers: Observer[] = [];

  // similar to add eventlistener
  registerObserver(obs: Observer) {
    this.observers.push(obs);
  }

  // similar to remove eventListener
  unregisterObserver(obs: Observer) {
    // loop through observers array and remove elem that's same as obs
    _.remove(this.observers, el => el === obs);
  }

  notifyObservers(data: any) {
    // loop through array and notify with data
    this.observers.forEach(obs => obs.notify(data));
  }
}

// make it global
export const globalEventBus = new EventBus();
