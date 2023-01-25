import Airtable from "airtable";
import { Invite } from "../../../invite.type";
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from "./airtable_keys";
import { escape } from "querystring";

const airtable = new Airtable({ apiKey: AIRTABLE_API_KEY });

const base = airtable.base(AIRTABLE_BASE_ID);

export function getInvite(inviteCode: string): Promise<Invite> {
  return new Promise((resolve, reject) => {
    base("invites")
      .select({
        filterByFormula: `{invite} = ${escape(inviteCode)}`,
        maxRecords: 1,
      })
      .firstPage((err, records) => {
        if (err) {
          console.error(err);
          return reject(err);
        }

        if (!records || records.length === 0) {
          return reject(new Error("Invite not found"));
        }

        resolve({
          code: String(records[0].fields.invite),
          name: String(records[0].fields.name),
          favouriteColor: String(records[0].fields.favouriteColor),
          weapon: String(records[0].fields.weapon),
          coming:
            typeof records[0].fields.coming === "undefined"
              ? undefined
              : records[0].fields.coming === "yes",
        });
      });
  });
}
