'use client';

import { useMemo, useReducer } from 'react';

import { addVideoReducer, GlobalContext, initialState } from '@/shared/store';

export default function ContextStore({
  children,
}: {
  children: React.ReactNode;
}) {
  const [contextState, dispatch] = useReducer(addVideoReducer, initialState);
  const contextValue = useMemo(
    () => ({
      state: contextState,
      dispatch,
    }),
    [contextState],
  );
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
