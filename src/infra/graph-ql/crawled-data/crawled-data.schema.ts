import { gql } from 'apollo-server';
import fs from 'fs';

const schemaString = fs.readFileSync('./schema.graphql', 'utf8');

const crawledDataSchema = gql`
  ${schemaString}
`;

export default crawledDataSchema;
