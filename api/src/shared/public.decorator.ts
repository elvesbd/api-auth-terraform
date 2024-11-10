import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { PUBLIC_ENDPOINT_METADATA_KEY } from './constants';

export const Public = (): CustomDecorator<string> =>
  SetMetadata(PUBLIC_ENDPOINT_METADATA_KEY, true);
