import { renderHook, waitFor } from "@testing-library/react";
import useFetch from "../hooks/useFetch";

test("useFetch starts loading true / data null, then resolves", async () => {
  const fetcher = () => Promise.resolve({ hello: "world" });
  const { result } = renderHook(() => useFetch(fetcher, []));

  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(null);

  await waitFor(() => expect(result.current.loading).toBe(false));
  expect(result.current.data).toEqual({ hello: "world" });
});
