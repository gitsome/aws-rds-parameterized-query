
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/RDSDataService.html#executeStatement-property
// NOTE: the keys here map to the types we use in our SQL statements
const SQL_TYPE_TO_PARAMETER_TYPE_MAP: {[key: string]: any} = {
  'varchar': 'stringValue',
  'int': 'longValue',
  'double': 'doubleValue',
  'boolean': 'booleanValue',
  'blob': 'blobValue',
  'datetime': 'stringValue'
};

const SQL_TYPES = `[${Object.keys(SQL_TYPE_TO_PARAMETER_TYPE_MAP).join(', ')}]`;

interface IJsonSchemaProperty {
  description: string;
  [x: string]: any;
}

interface IJsonSchema {
  properties: {
    [key: string]: IJsonSchemaProperty;
  };
  [x: string]: any;
}

interface IAttributes {
  [key: string]: any;
}

const getParameters = (attributeKeyValues: IAttributes, jsonSchemaDereferenced: IJsonSchema) => {

  return Object.keys(attributeKeyValues).map((attributeKey: string) => {

    if (jsonSchemaDereferenced.properties[attributeKey] === undefined) {
      const detectedProperties = jsonSchemaDereferenced.properties ? `[${Object.keys(jsonSchemaDereferenced.properties)}]` : 'UNDEFINED';
      throw new Error(`aws-rds-parameterized-query.error: Property ${attributeKey} not found on json schema properties. Ensure you are sending a dereferenced version. Detected properties: ${detectedProperties}`)
    }

    const sqlTypeFromJsonSchemaProp = jsonSchemaDereferenced.properties[attributeKey].description;

    const rdsParameterType: string|undefined = SQL_TYPE_TO_PARAMETER_TYPE_MAP[sqlTypeFromJsonSchemaProp];

    if (rdsParameterType === undefined) {
      throw new Error(`aws-rds-parameterized-query.error: JSON Schema Description ${sqlTypeFromJsonSchemaProp} was not a valid SQL type. Was looking for one of these ${SQL_TYPES}`);
    }

    return {
      'name': attributeKey,
      'value': { [rdsParameterType]: attributeKeyValues[attributeKey] }
    };
  });
};

const insert = (attributeKeyValues: IAttributes, jsonSchemaDereferenced: IJsonSchema) => {

  const attributes = `(${Object.keys(attributeKeyValues).join(',')})`;
  const values = `(${Object.keys(attributeKeyValues).map((attribute) => { return `:${attribute}`;}).join(',')})`;

  const parameters = getParameters(attributeKeyValues, jsonSchemaDereferenced);

  return {
    attributes,
    values,
    parameters
  };
};

const update = (attributeKeyValues: IAttributes, jsonSchemaDereferenced: IJsonSchema) => {

  const update = `${Object.keys(attributeKeyValues).map((attribute) => { return `${attribute}=:${attribute}`;}).join(',')}`;
  const parameters = getParameters(attributeKeyValues, jsonSchemaDereferenced);

  return {
    update,
    parameters
  };
};

export default {
  insert,
  update
};