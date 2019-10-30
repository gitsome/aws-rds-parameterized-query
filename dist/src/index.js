"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlParameterizedQuery = (attributeList, jsonSchemaValidator) => {
    const attributes = `(${attributeList.join(',')})`;
    const values = `(${attributeList.map((attribute) => { return `:${attribute}`; }).join(',')})`;
    const parameters = attributeList.map((attribute) => {
        console.log("jsonSchemaValidator:", jsonSchemaValidator);
        return {
            'name': 'package_name',
            'value': { 'stringValue': 'package-2' }
        };
    });
    return {
        attributes,
        values,
        parameters
    };
};
exports.default = sqlParameterizedQuery;
