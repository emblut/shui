import { PutItemCommand } from '@aws-sdk/client-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { client } from '../../services/db.mjs';
import {
  successResponse,
  errorResponse,
} from '../../utils/responseHandler.mjs';
import { MESSAGES_TABLE, MESSAGE_PK } from '../../utils/constants.mjs';
import { validateCreation } from '../../utils/validation/validateMessage.mjs';
import { getSwedishTime } from '../../utils/getSwedishTime.mjs';

export const handler = async (event) => {
  try {
    if (!event.body) {
      return errorResponse(400, 'Missing request body');
    }

    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return errorResponse(400, 'Invalid JSON format');
    }

    const { username, text, color } = body;
    if (!username || !text || !color) {
      return errorResponse(400, 'Username, text and color must be provided');
    }

    //Lägga till validation för color
    const validationError = validateCreation({ username, text, color });
    if (validationError) {
      return errorResponse(400, validationError);
    }

    const id = uuidv4();
    const now = new Date().toISOString();
    const swedishTime = getSwedishTime();

    const command = new PutItemCommand({
      TableName: MESSAGES_TABLE,
      Item: {
        pk: { S: MESSAGE_PK },
        sk: { S: now },
        id: { S: id },
        username: { S: username },
        text: { S: text },
        color: { S: color },
        createdAt: { S: swedishTime },
      },
    });

    await client.send(command);

    return successResponse(201, { id, username, text, color, createdAt: swedishTime });
  } catch (error) {
    console.error('Error creating message:', error);
    return errorResponse(500, 'Internal server error');
  }
};
