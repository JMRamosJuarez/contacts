import { useEffect, useRef } from 'react';

import { AppState } from 'react-native';

export const useForegroundEffect = (
  condition: boolean,
  callback: () => void,
) => {
  const appState = useRef(AppState.currentState);
  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        if (
          condition &&
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          // The app has come to the foreground!
          callback();
        }
        appState.current = nextAppState;
      },
    );
    return () => {
      subscription.remove();
    };
  }, [callback, condition]);
};
