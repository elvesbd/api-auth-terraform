import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { User } from 'src/domain/user';

const {
  LOCAL_DEVELOPMENT = false,
  AWS_REGION = 'us-east-1',
  ENVIRONMENT = 'dev',
} = process.env;

const client = new DynamoDBClient({
  region: AWS_REGION,
  endpoint: LOCAL_DEVELOPMENT ? 'http://localhost:8000' : undefined,
});

type UserRecord = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

@Injectable()
export class UsersRepository {
  public async createUser(user: User): Promise<void> {
    const command = new PutItemCommand({
      TableName: `${ENVIRONMENT}-users`,
      Item: marshall({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      }),
      ConditionExpression: 'attribute_not_exists(id)',
    });

    await client.send(command);
  }

  public async getUserByEmail(email: string): Promise<User | undefined> {
    const command = new QueryCommand({
      TableName: `${ENVIRONMENT}-users`,
      IndexName: 'email_index',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: marshall({ ':email': email }),
    });

    const { Items } = await client.send(command);
    if (Items?.length === 0) return undefined;

    const userRecord = unmarshall(Items[0]) as UserRecord;
    return new User(userRecord);
  }

  public async getUserById(userId: string): Promise<User | undefined> {
    const command = new GetItemCommand({
      TableName: `${ENVIRONMENT}-users`,
      Key: marshall({ id: userId }),
    });

    const { Item } = await client.send(command);
    if (!Item) return undefined;

    const userRecord = unmarshall(Item) as UserRecord;

    return new User(userRecord);
  }
}
