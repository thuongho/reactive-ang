import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'browser-event-experiments',
  templateUrl: './browser-event-experiments.component.html',
  styleUrls: ['./browser-event-experiments.component.scss']
})
export class BrowserEventExperimentsComponent implements OnInit {

  hoverSection: HTMLElement;

  ngOnInit() {
    this.hoverSection = document.getElementById('hover');

    // subscribe to mousemove event, add onMouseMove callback
    this.hoverSection.addEventListener('mousemove', onMouseMove);
  }

  unsubscribe() {
    console.log('called unsubscribed()');

    // remove subscription to mousemove event, remove onMouseMove callback
    this.hoverSection.removeEventListener('mousemove', onMouseMove);
  }

}

function onMouseMove(ev) {
  console.log(ev);
}

