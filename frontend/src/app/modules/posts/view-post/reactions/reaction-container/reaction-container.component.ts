import { Component, OnInit, Input } from '@angular/core';
import { Reaction } from '../../../../../../app/model/reaction.model';

@Component({
  selector: 'app-reaction-container',
  templateUrl: './reaction-container.component.html',
  styleUrls: ['./reaction-container.component.scss']
})
export class ReactionContainerComponent implements OnInit {

  @Input() reaction: Reaction;

  constructor() { }

  ngOnInit() {
  }

  SelectReaction(type: String) {
    switch (type) {
      case "r1":
        console.log("Smiley");
        break;
    }
    console.log("Reaction selected");
  }

}
