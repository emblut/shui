import { QueryCommand } from '@aws-sdk/client-dynamodb';
import { client } from '../../services/db.mjs';
import { MESSAGES_TABLE, MESSAGE_PK } from '../../utils/constants.mjs';

import {
  successResponse,
  errorResponse,
} from '../../utils/responseHandler.mjs';

export const handler = async (event) => {
  try {
    const username = event.queryStringParameters?.username;
    const sortOrder = event.queryStringParameters?.sortOrder;

    if (!sortOrder) {
      return errorResponse(400, 'Sort-order must be provided');
    }
    let scanForward;
    if (sortOrder === 'newestFirst') {
      scanForward = false;
    } else if (sortOrder === 'oldestFirst') {
      scanForward = true;
    } else {
      return errorResponse(400, 'Invalid sort-order');
    }

    let queryCommand;

    if (username) {
      if (typeof username !== 'string') {
        return errorResponse(400, 'Invalid username');
      }

      queryCommand = new QueryCommand({
        TableName: MESSAGES_TABLE,
        IndexName: 'UsernameIndex',
        KeyConditionExpression: 'username = :username',
        ExpressionAttributeValues: { ':username': { S: username } },
        ScanIndexForward: scanForward,
      });
    } else {
      queryCommand = new QueryCommand({
        TableName: MESSAGES_TABLE,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: { ':pk': { S: MESSAGE_PK } },
        ScanIndexForward: scanForward,
      });
    }

    const queryResult = await client.send(queryCommand);
    if (queryResult.Items.length === 0) {
      return successResponse(200, []);
    }

    const allMessages = queryResult.Items.map((item) => {
      const message = {
        pk: item.pk.S,
        sk: item.sk.S,
        id: item.id.S,
        text: item.text.S,
        color: item.color.S,
        username: item.username.S,
        createdAt: item.createdAt.S,
      };

      if (item.modifiedBy) message.modifiedBy = item.modifiedBy.S;
      if (item.modifiedAt) message.modifiedAt = item.modifiedAt.S;

      return message;
    });

    return successResponse(200, allMessages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return errorResponse(500, 'Internal server error');
  }
};
