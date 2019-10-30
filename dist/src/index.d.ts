declare const sqlParameterizedQuery: (attributeList: string[], jsonSchemaValidator: any) => {
    attributes: string;
    values: string;
    parameters: {
        'name': string;
        'value': {
            'stringValue': string;
        };
    }[];
};
export default sqlParameterizedQuery;
