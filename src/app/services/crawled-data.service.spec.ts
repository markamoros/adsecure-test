import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';
import { mocked } from 'jest-mock';

import { CrawledDataService } from './crawled-data.service.js';
import { DynamoDBWrapper } from '../../infra/dynamoDB/dynamo-db.wrapper.js';
import { CrawledDataRecord } from '../../domain/types/crawled-data.type.js';

const crawledData: CrawledDataRecord = {
  url: 'https://random.io',
  pageTitle: 'Random IO',
  wordCount: 5000,
  timestamp: new Date().getTime(),
};

const mockPutItem = jest.fn();
const mockQueryItems = jest.fn();

jest.mock('../../infra/dynamoDB/dynamo-db.wrapper', () => {
  return {
    DynamoDBWrapper: jest.fn().mockImplementation(() => {
      return {
        putItem: mockPutItem,
        queryItems: mockQueryItems,
      };
    }),
  };
});

describe('CrawledDataService', () => {
  const dynamoDBWrapper = new DynamoDBWrapper<CrawledDataRecord>();

  let service: CrawledDataService;
  let mockedDynamoDBWrapper: DynamoDBWrapper<CrawledDataRecord>;

  beforeEach(() => {
    mockedDynamoDBWrapper = mocked(dynamoDBWrapper, { shallow: true });
    service = new CrawledDataService(mockedDynamoDBWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insert', () => {
    it('should insert data successfully', async () => {
      await service.insert(crawledData);
      expect(mockPutItem).toHaveBeenCalledWith('CrawledData', crawledData);
    });

    it('should throw an error if insertion fails', async () => {
      mockPutItem.mockRejectedValue(new Error('Insertion failed'));

      await expect(service.insert(crawledData)).rejects.toThrow(
        'Failed to insert metadata',
      );
    });
  });

  describe('queryByUrl', () => {
    it('should query data by URL successfully', async () => {
      const { url } = crawledData;
      const queryInput: DocumentClient.QueryInput = {
        KeyConditionExpression: 'url = :url',
        ExpressionAttributeValues: { ':url': url },
        TableName: 'CrawledData',
      };

      mockQueryItems.mockResolvedValue([crawledData]);

      const queriedData = await service.queryByUrl(url);

      expect(mockQueryItems).toHaveBeenCalledWith('CrawledData', queryInput);
      expect(queriedData).toEqual(crawledData);
    });

    it('should throw an error if query fails', async () => {
      const { url } = crawledData;
      mockQueryItems.mockRejectedValue(new Error('Query failed'));

      await expect(service.queryByUrl(url)).rejects.toThrow(
        'Failed to query metadata',
      );
    });
  });
});
