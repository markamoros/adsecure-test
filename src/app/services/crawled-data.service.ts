import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';

import { DynamoDBWrapper } from '../../infra/dynamoDB/dynamo-db.wrapper.js';
import { CrawledDataRecord } from '../../domain/types/crawled-data.type.js';

export class CrawledDataService {
  private readonly tableName: string;

  constructor(
    private readonly dynamoDBWrapper: DynamoDBWrapper<CrawledDataRecord>,
  ) {
    this.tableName = 'CrawledData';
  }

  public async insert(crawledData: CrawledDataRecord): Promise<void> {
    try {
      await this.dynamoDBWrapper.putItem(this.tableName, crawledData);
    } catch (error) {
      throw new Error('Failed to insert metadata');
    }
  }

  public async queryByUrl(url: string): Promise<CrawledDataRecord | null> {
    const queryInput: DocumentClient.QueryInput = {
      KeyConditionExpression: 'url = :url',
      ExpressionAttributeValues: { ':url': url },
      TableName: this.tableName,
    };

    try {
      const results = await this.dynamoDBWrapper.queryItems(
        this.tableName,
        queryInput,
      );
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw new Error('Failed to query metadata');
    }
  }
}
