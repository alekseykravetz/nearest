import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SideBarConfigurationService {

  public asideContentEnabledSubject = new BehaviorSubject<boolean>(true);

  disableAsideContent() {
    this.asideContentEnabledSubject.next(false);
  }

  enableAsideContent() {
    this.asideContentEnabledSubject.next(true);
  }
}
