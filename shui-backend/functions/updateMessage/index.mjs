import { client } from '../../services/db.mjs';
import { QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import {
  successResponse,
  errorResponse,
} from '../../utils/responseHandler.mjs';

import { MESSAGES_TABLE, MESSAGE_PK } from '../../utils/constants.mjs';
import { validateMessage } from '../../utils/validation/validateMessage.mjs';
import { getSwedishTime } from '../../utils/getSwedishTime.mjs';

export const handler = async (event) => {
  try {
    const { id, username, text } = JSON.parse(event.body);

    if (!id || !username || !text) {
      return errorResponse(400, 'ID, username and text must be provided');
    }

    const validationError = validateMessage({ username, text });
    if (validationError) {
      return errorResponse(400, validationError);
    }

    const queryCommand = new QueryCommand({
      TableName: MESSAGES_TABLE,
      IndexName: 'IdIndex',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': { S: id } },
    });

    const queryResult = await client.send(queryCommand);

    if (!queryResult.Items || queryResult.Items.length === 0) {
      return errorResponse(404, 'Message not found');
    }

    const item = queryResult.Items[0];
    const swedishTime = getSwedishTime();

    const updateCommand = new UpdateItemCommand({
      TableName: MESSAGES_TABLE,
      Key: {
        pk: { S: item.pk.S },
        sk: { S: item.sk.S },
      },
      UpdateExpression: `
        SET #text = :text,
            modifiedBy = :username,
            modifiedAt = :modifiedAt
      `,
      ExpressionAttributeNames: {
        '#text': 'text',
      },
      ExpressionAttributeValues: {
        ':text': { S: text },
        ':username': { S: username },
        ':modifiedAt': { S: swedishTime },
      },
      ReturnValues: 'ALL_NEW',
    });

    const response = await client.send(updateCommand);
    const updated = response.Attributes;

    return successResponse(200, {
      pk: updated.pk.S,
      sk: updated.sk.S,
      id: updated.id.S,
      username: updated.username.S,
      text: updated.text.S,
      createdAt: updated.createdAt.S,
      modifiedBy: updated.modifiedBy.S,
      modifiedAt: updated.modifiedAt.S,
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return errorResponse(500, 'Internal server error');
  }
};
