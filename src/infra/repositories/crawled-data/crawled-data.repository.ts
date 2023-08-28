import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';

import { DynamoDBWrapper } from '../../dynamo-db/dynamo-db.wrapper.js';
import { CrawledDataRecord } from '../../../domain/types/crawled-data.type.js';
import { CrawledDataFilter } from '../../../domain/filters/crawled-data.filter.js';

export class CrawledDataRepository {
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

  public async update(
    id: string,
    updateData: CrawledDataRecord,
  ): Promise<void> {
    const updateExpression = Object.keys(updateData)
      .map((key, index) => `${key} = :value${index}`)
      .join(', ');

    const expressionAttributeValues = Object.keys(updateData).reduce(
      (acc, key, index) => {
        acc[`:value${index}`] = updateData[key];
        return acc;
      },
      {},
    );

    const updateInput: DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: `set ${updateExpression}`,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    try {
      await this.dynamoDBWrapper.updateItem(this.tableName, updateInput);
    } catch (error) {
      throw new Error('Failed to update metadata');
    }
  }

  public async query(
    filter: CrawledDataFilter,
    fields: string[],
    limit: number,
    offset: number,
  ): Promise<CrawledDataRecord[]> {
    const queryInput: DocumentClient.QueryInput = {
      TableName: this.tableName,
      KeyConditionExpression: '',
      ExpressionAttributeValues: {},
    };

    if (fields) {
      queryInput.ProjectionExpression = fields.join(', ');
    }

    if (limit) {
      queryInput.Limit = limit;
    }

    if (offset) {
      queryInput.ExclusiveStartKey = {
        id: offset,
      };
    }

    let isFirstCondition = true;

    if (filter.url) {
      queryInput.KeyConditionExpression += 'url = :url';
      queryInput.ExpressionAttributeValues = {
        ...queryInput.ExpressionAttributeValues,
        ':url': filter.url,
      };
      isFirstCondition = false;
    }

    if (filter.wordCountRange) {
      const condition = 'wordCount BETWEEN :minWordCount AND :maxWordCount';
      queryInput.KeyConditionExpression += isFirstCondition
        ? condition
        : ` AND ${condition}`;
      queryInput.ExpressionAttributeValues = {
        ...queryInput.ExpressionAttributeValues,
        ':minWordCount': filter.wordCountRange.min,
        ':maxWordCount': filter.wordCountRange.max,
      };
      isFirstCondition = false;
    }

    if (filter.dateRange) {
      const condition = 'timestamp BETWEEN :startTimestamp AND :endTimestamp';
      queryInput.KeyConditionExpression += isFirstCondition
        ? condition
        : ` AND ${condition}`;
      queryInput.ExpressionAttributeValues = {
        ...queryInput.ExpressionAttributeValues,
        ':startTimestamp': filter.dateRange.startDate,
        ':endTimestamp': filter.dateRange.endDate,
      };
    }

    try {
      return await this.dynamoDBWrapper.queryItems(this.tableName, queryInput);
    } catch (error) {
      throw new Error('Failed to query metadata');
    }
  }
}
