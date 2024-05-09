import type { RematchDispatch, RematchRootState } from '@rematch/core';
import { init } from '@rematch/core';

import type { RootModel } from '.';
import { models } from '.';

export const store = init<RootModel>({
  models,
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
