/**
 * Love-quiz receiver for Ravi & Priyanka's wedding invitation.
 *
 * Setup (once, ~3 minutes):
 *  1. Open the Google Sheet → Extensions → Apps Script.
 *  2. Delete any code there, paste this whole file, click Save.
 *  3. Deploy → New deployment → gear icon → "Web app".
 *       Description: Love quiz
 *       Execute as:  Me
 *       Who has access: Anyone
 *     Click Deploy, then "Authorize access" and allow it with your Google account.
 *  4. Copy the "Web app URL" (ends in /exec) and set it in lib/content.ts → config.quizEndpoint.
 *
 * Updating later WITHOUT changing the URL:
 *  Deploy → Manage deployments → pencil icon → Version: "New version" → Deploy.
 *
 * Each guest's answers are added as a new row on a tab named "Love Quiz" (created automatically).
 * Each email address or mobile number can submit only once; repeats are refused.
 * Nothing else in the spreadsheet is changed.
 */
const SHEET_NAME = "Love Quiz";
const FIELDS = [
  ["submittedAt", "Submitted at"],
  ["name", "Name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["status", "Relationship status"],
  ["q1", "Perfect date night"],
  ["q2", "Favourite wedding moment"],
  ["q3", "How they show love"],
  ["q4", "Song in their heart"],
  ["result", "Love personality"],
  ["score", "Love score"],
  ["invitedAs", "Invite link name"],
];
const EMAIL_COL = 3; // column C
const PHONE_COL = 4; // column D

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(FIELDS.map(f => f[1]));
      sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight("bold").setBackground("#F6E7E2");
      sheet.setFrozenRows(1);
    }
    const p = (e && e.parameter) || {};

    // One entry per email or mobile number.
    const email = normEmail(p.email), phone = normPhone(p.phone);
    const last = sheet.getLastRow();
    if (last > 1 && (email || phone)) {
      const rows = sheet.getRange(2, EMAIL_COL, last - 1, 2).getValues();
      const dup = rows.some(r => (email && normEmail(r[0]) === email) || (phone && normPhone(r[1]) === phone));
      if (dup) return json({ ok: false, duplicate: true });
    }

    const row = FIELDS.map(([key]) => clean(key === "submittedAt" ? new Date().toISOString() : p[key]));
    sheet.appendRow(row);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function normEmail(v) { return String(v == null ? "" : v).trim().toLowerCase(); }
function normPhone(v) { return String(v == null ? "" : v).replace(/\D/g, "").slice(-10); }

/** Keeps entries short and stops anything that looks like a spreadsheet formula from running. */
function clean(v) {
  let s = String(v == null ? "" : v).slice(0, 300);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}
