import { TestBed } from '@angular/core/testing';

import { ProjectCoreService } from './project-core.service';

describe('ProjectCoreService', () => {
  let service: ProjectCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
