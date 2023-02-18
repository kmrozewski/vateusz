import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDB({region: process.env.REGION});
const dynamo = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const body = JSON.parse(event.body);
  const params = {
    TableName : process.env.TABLE_NAME,
    Item: {...body}
  };
  const command = new PutCommand(params);

  try {
    const result = await dynamo.send(command);
    return {
      statusCode: 200,
      body: 'Success: ' + result,
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: 'Failed to update table: ' + err,
    };
  }
};
