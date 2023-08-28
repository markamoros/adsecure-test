import { DocumentClient } from 'aws-sdk/clients/dynamodb.js';
import { mocked } from 'jest-mock';

import { CrawledDataRepository } from './crawled-data.repository.js';
import { DynamoDBWrapper } from '../../dynamo-db/dynamo-db.wrapper.js';
import { CrawledDataRecord } from '../../../domain/types/crawled-data.type.js';
import { CrawledDataFilter } from '../../../domain/filters/crawled-data.filter.js';

const crawledData: CrawledDataRecord = {
  url: 'https://random.io',
  pageTitle: 'Random IO',
  wordCount: 5000,
  timestamp: new Date().getTime(),
};

const mockPutItem = jest.fn();
const mockQueryItems = jest.fn();

jest.mock('../../dynamo-db/dynamo-db.wrapper', () => {
  return {
    DynamoDBWrapper: jest.fn().mockImplementation(() => {
      return {
        putItem: mockPutItem,
        queryItems: mockQueryItems,
      };
    }),
  };
});

describe('CrawledDataRepository', () => {
  const dynamoDBWrapper = new DynamoDBWrapper<CrawledDataRecord>();

  let repository: CrawledDataRepository;
  let mockedDynamoDBWrapper: DynamoDBWrapper<CrawledDataRecord>;

  beforeEach(() => {
    mockedDynamoDBWrapper = mocked(dynamoDBWrapper, { shallow: true });
    repository = new CrawledDataRepository(mockedDynamoDBWrapper);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('insert', () => {
    it('should insert data successfully', async () => {
      await repository.insert(crawledData);
      expect(mockPutItem).toHaveBeenCalledWith('CrawledData', crawledData);
    });

    it('should throw an error if insertion fails', async () => {
      mockPutItem.mockRejectedValue(new Error('Insertion failed'));

      await expect(repository.insert(crawledData)).rejects.toThrow(
        'Failed to insert metadata',
      );
    });
  });

  describe('query', () => {
    it('should query data by filter successfully', async () => {
      const filter: CrawledDataFilter = {
        url: 'https://random.io',
      };
      const queryInput: DocumentClient.QueryInput = {
        KeyConditionExpression: 'url = :url',
        ExpressionAttributeValues: { ':url': filter.url },
        ProjectionExpression: '',
        TableName: 'CrawledData',
      };

      mockQueryItems.mockResolvedValue([crawledData]);

      const queriedData = await repository.query(filter, [], 0, 0);

      expect(mockQueryItems).toHaveBeenCalledWith('CrawledData', queryInput);
      expect(queriedData).toEqual([crawledData]);
    });

    it('should throw an error if query fails', async () => {
      const filter: CrawledDataFilter = { url: 'https://random.io' };
      mockQueryItems.mockRejectedValue(new Error('Query failed'));

      await expect(repository.query(filter, [], 0, 0)).rejects.toThrow(
        'Failed to query metadata',
      );
    });
  });
});
