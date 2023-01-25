import { NextApiRequest, NextApiResponse } from "next";
// import { InviteResponse } from "../../invite.type.ts";
import { getInvite } from "./utils/airtable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!req.query.code) {
    return res.status(400).json({ error: "Missing code" });
  }
  const code = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code;
  try {
    const invite = await getInvite(code);
    console.log({ invite });
    res.status(200).json(invite);
    return
  } catch (err) {
    if ((err as Error).message === "Invite not found") {
      return res.status(401).json({ error: "Invite not found" });
    }
  }

  res.status(500).json({ error: "Something went wrong" });
}
