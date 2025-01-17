import { of } from 'rxjs';
import { createHostFactory, SpectatorWithHost } from '@ngneat/spectator';

import { QueryService } from '../query.service';

import { AsyncComponent } from './async.component';

describe('ZippyComponent', () => {
  let host: SpectatorWithHost<AsyncComponent>;

  const createHost = createHostFactory({
    component: AsyncComponent,
    mocks: [QueryService]
  });

  it('should work', () => {
    const { component } = createHost(`<app-async></app-async>`);
    expect(component).toBeDefined();
  });

  it('should be falsy', () => {
    host = createHost(`<app-async></app-async>`);
    expect(host.query('p')).not.toExist();
  });

  it('should be truthy', () => {
    host = createHost(`<app-async></app-async>`, { detectChanges: false });
    const queryService = host.get(QueryService);
    queryService.select.and.returnValue(of(true));
    host.detectChanges();
    expect(host.query('p')).toExist();
  });
});
