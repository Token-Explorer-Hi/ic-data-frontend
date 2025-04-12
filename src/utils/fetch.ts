import { api } from "@/constants";
import { resultFormat } from "@/utils/resultFormat";

export async function fetch_post<T>(url: string, data?: any) {
  const fetch_result = await fetch(`${api}${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch(() => undefined);

  const result = (await fetch_result?.json()) as T | undefined;
  return resultFormat<T>(result);
}
