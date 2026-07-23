import { Resend } from "resend";

// Constructing Resend with a missing/empty key throws immediately, so only
// instantiate it when a key is actually configured — callers must check for null.
export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
