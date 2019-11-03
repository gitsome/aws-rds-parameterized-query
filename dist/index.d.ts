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
declare const _default: {
    insert: (attributeKeyValues: IAttributes, jsonSchemaDereferenced: IJsonSchema) => {
        attributes: string;
        values: string;
        parameters: {
            'name': string;
            'value': {
                [x: string]: any;
            };
        }[];
    };
    update: (attributeKeyValues: IAttributes, jsonSchemaDereferenced: IJsonSchema) => {
        update: string;
        parameters: {
            'name': string;
            'value': {
                [x: string]: any;
            };
        }[];
    };
};
export default _default;
