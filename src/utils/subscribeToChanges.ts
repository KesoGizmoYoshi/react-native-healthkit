import Native, { EventEmitter } from "../native-types";

import type { HKSampleTypeIdentifier } from "..";

const subscribeToChanges = async (
  identifier: HKSampleTypeIdentifier,
  callback: () => void
) => {
  console.log(identifier);

  const subscription = EventEmitter.addListener(
    "onChange",
    ({ typeIdentifier }) => {
      if (typeIdentifier === identifier) {
        callback();
      }
    }
  );

  const queryId = await Native.subscribeToObserverQuery(identifier).catch(
    async (error) => {
      subscription.remove();
      return Promise.reject(error);
    }
  );

  console.log(queryId);

  return async () => {
    subscription.remove();
    return Native.unsubscribeQuery(queryId);
  };
};

export default subscribeToChanges;
