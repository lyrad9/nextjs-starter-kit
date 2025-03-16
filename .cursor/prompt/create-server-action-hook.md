---
description:
globs:
alwaysApply: false
---

```tsx
// /src/hooks/server-action.ts
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { setupServerActionHooks } from "zsa-react-query";
export const QueryKeyFactory = createServerActionsKeyFactory({
  getPosts: () => ["getPosts"],
  getFriends: () => ["getFriends"],
  getPostsAndFriends: () => ["getPosts", "getFriends"],
  somethingElse: (id: string) => ["somethingElse", id],
  getRandomNumber: () => ["getRandomNumber"],
});

const {
  useServerActionQuery,
  useServerActionMutation,
  useServerActionInfiniteQuery,
} = setupServerActionHooks({
  hooks: {
    useQuery: useQuery,
    useMutation: useMutation,
    useInfiniteQuery: useInfiniteQuery,
  },
});

export {
  useServerActionInfiniteQuery,
  useServerActionMutation,
  useServerActionQuery,
};
```
