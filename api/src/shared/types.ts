import { FastifyRequest } from 'fastify';

export type TokenPayload = {
  sub: string;
  name: string;
  email: string;
  exp: number;
  iat: number;
  aud: string;
};

export type AuthenticateRequest = {
  userId: string;
} & FastifyRequest;
