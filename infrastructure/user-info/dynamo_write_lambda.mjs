import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocumentClient, PutCommand} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB({region: process.env.REGION});
const dynamo = DynamoDBDocumentClient.from(client);
const allowedOrigins = process.env.ALLOW_ORIGIN.split(',')

export const handler = async (event) => {
  const origin = event.headers.Origin || event.headers.origin;
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {...body}
  };
  const command = new PutCommand(params);
  const headers = {
    'Access-Control-Allow-Headers': process.env.ALLOW_HEADERS,
    'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
    'Access-Control-Allow-Methods': process.env.ALLOW_METHODS,
  };

  try {
    const result = await dynamo.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers,
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify(err),
      headers,
    };
  }
};
