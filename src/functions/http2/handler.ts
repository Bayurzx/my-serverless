import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from './schema';
// require('aws-sdk/clients/dynamodb');
// const { DynamoDB } = require("@aws-sdk/client-dynamodb");

// const { DynamoDB } = require('aws-sdk/clients/dynamodb');
// const docClient = new DynamoDB({ region: "us-east-1" });
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE || "groups";

const http2: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const result = await docClient.scan({
    TableName: groupsTable
  }).promise()
  
  const items = result.Items
  
  return formatJSONResponse({
    message: items,
    event,
  });
};

export const main = middyfy(http2);