import type { ReactElement, ReducerWithoutAction } from 'react';
import { useMemo, useReducer } from 'react';

import { GlobalContext } from './store';

interface Props {
  reducer: ReducerWithoutAction<any>;
  initialState: Record<string, any>;
  children?: ReactElement;
}

function ComponentWithContext({ reducer, initialState, children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}

export default ComponentWithContext;
