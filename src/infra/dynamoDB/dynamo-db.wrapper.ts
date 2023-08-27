import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';

export class DynamoDBWrapper<T extends Record<string, unknown>> {
  private readonly documentClient: DocumentClient;

  constructor() {
    this.documentClient = new DynamoDB.DocumentClient();
  }

  public async putItem(tableName: string, item: T): Promise<void> {
    const params: DocumentClient.PutItemInput = {
      TableName: tableName,
      Item: item,
    };

    try {
      await this.documentClient.put(params).promise();
    } catch (error) {
      console.error('Error inserting data:', error);
      throw new Error(`Unable to put item in table ${tableName}`);
    }
  }

  public async queryItems(
    tableName: string,
    queryInput: DocumentClient.QueryInput,
  ): Promise<T[]> {
    queryInput.TableName = tableName;

    try {
      const result = await this.documentClient.query(queryInput).promise();
      return result.Items as T[];
    } catch (error) {
      console.error('Error querying data:', error);
      throw new Error(`Unable to query items from table ${tableName}`);
    }
  }
}
