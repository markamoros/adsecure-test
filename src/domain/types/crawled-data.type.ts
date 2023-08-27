import { CrawledData } from '../models/crawled-data.model.js';

/**
 * Type definition for CrawledDataRecord
 *
 * This type is an intersection of the CrawledData model and the Record<string, unknown> type.
 * It is designed to satisfy type constraints for DynamoDB operations while maintaining
 * the structure of the CrawledData model.
 */
export type CrawledDataRecord = CrawledData & Record<string, unknown>;
