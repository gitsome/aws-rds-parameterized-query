"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const client_json_1 = __importDefault(require("./json-schema/client.json"));
const index_1 = __importDefault(require("../src/index"));
describe('Basice Scenarios', () => {
    it('works', () => {
        const ajv = new ajv_1.default({ schemaId: 'id' });
        const jsonSchemaValidator = ajv.compile(client_json_1.default);
        const { attributes, values, parameters } = index_1.default([
            'sow_name',
            'session_type',
            'session_purchased',
            'session_rate',
            'session_count_per_coachee',
            'start_date',
            'end_date',
            'client_id',
            'client_admin_id'
        ], jsonSchemaValidator);
        console.log(attributes, values, parameters);
        expect(true).toEqual(true);
    });
});
