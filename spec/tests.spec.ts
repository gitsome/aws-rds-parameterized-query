
import parameterizedQuery from '../src/index';

import jsonSchemaDereferenced from './json-schema/example1.json';

describe('Basice Scenarios', () => {

  it('works', () => {

    const data = {
      'sow_name' : 'hello',
      'session_type' : 'COOL',
      'session_purchased' : 1234,
      'session_rate' : 5.55,
      'session_count_per_coachee' : 12,
      'start_date' : 'SDFASDFASF',
      'end_date' : 'SDFASDFASF',
      'client_id' : 112245,
      'client_admin_id' : 192625
    };

    const { attributes, values, parameters } = parameterizedQuery(data, jsonSchemaDereferenced);

    expect(true).toEqual(true);
  });
});