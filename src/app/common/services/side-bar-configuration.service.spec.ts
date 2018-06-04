import { TestBed, inject } from '@angular/core/testing';

import { SideBarConfigurationService } from './side-bar-configuration.service';

describe('SideBarConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SideBarConfigurationService]
    });
  });

  it('should be created', inject([SideBarConfigurationService], (service: SideBarConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
