import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { SideBarConfigurationService } from '../../services/side-bar-configuration.service';

@Component({
  selector: 'app-side-container',
  templateUrl: './side-container.component.html',
  styleUrls: ['./side-container.component.css']
})
export class SideContainerComponent {

  asideContentEnabled: boolean;
  @ViewChild(MatDrawer) matDrawer;

  constructor(private sideBarConfService: SideBarConfigurationService) {
    sideBarConfService.asideContentEnabledSubject.subscribe(sideEnabled => {
      this.asideContentEnabled = sideEnabled;
    });
  }

  toggle() {
    if (this.asideContentEnabled) {
      this.matDrawer.toggle();
    }
  }
}
