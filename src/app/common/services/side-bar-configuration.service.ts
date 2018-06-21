import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAdditionalButton } from 'models/additional-button';

@Injectable()
export class SideBarConfigurationService {

  asideContentEnabledSubject = new BehaviorSubject<boolean>(true);
  additionalButtonsSubject = new BehaviorSubject<IAdditionalButton[]>([]);

  disableAsideContent() {
    this.asideContentEnabledSubject.next(false);
  }

  enableAsideContent() {
    this.asideContentEnabledSubject.next(true);
  }

  changeAdditionalButtons(buttons: IAdditionalButton[]) {
    this.additionalButtonsSubject.next(buttons);
  }
}
