import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { SideBarConfigurationService } from '../../common/services/side-bar-configuration.service';
import { IAdditionalButton } from 'models/additional-button';

@Component({
  selector: 'app-side-container',
  templateUrl: './side-container.component.html',
  styleUrls: ['./side-container.component.css']
})
export class SideContainerComponent {

  asideOpen: boolean;
  asideContentEnabled: boolean;
  @ViewChild(MatDrawer) matDrawer;

  additionalButtons: IAdditionalButton[];
  constructor(private sideBarConfService: SideBarConfigurationService) {
    sideBarConfService.asideContentEnabledSubject.subscribe(sideEnabled => {
      this.asideContentEnabled = sideEnabled;
    });
    sideBarConfService.additionalButtonsSubject.subscribe(buttons => {
      this.additionalButtons = buttons;
    });
  }

  toggle() {
    if (this.asideContentEnabled) {
      this.matDrawer.toggle();
    }
  }

  additionalButtonClicked(additionalButton: IAdditionalButton) {
    // todo: remove actionContext
    additionalButton.action.apply(additionalButton.actionContext);
  }
}
