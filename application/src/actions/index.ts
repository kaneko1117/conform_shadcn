"use server";

import { DATA_SCHEMA } from "@/schema";
import { parseWithZod } from "@conform-to/zod";

export const serverActions = async (prevState: unknown, formData: FormData) => {
  console.log(formData);
  const submission = parseWithZod(formData, {
    schema: DATA_SCHEMA,
  });
  // データが有効でない場合は、エラーをクライアントに返します。
  if (submission.status !== "success") {
    return submission.reply();
  }
  // データが有効な場合は、データをデータベースに保存します。
  // 今回は省略します。
};
