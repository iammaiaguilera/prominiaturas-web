---
description: How to connect the Contact Form to Google Sheets
---

# Google Sheets Contact Form Integration

To receive form submissions directly in a Google Sheet, follow these steps:

## 1. Create the Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new sheet.
2. Name it "ProMiniaturas Leads" (or similar).
3. In the first row, add the headers for your data:
    - Column A: `Timestamp`
    - Column B: `Name`
    - Column C: `Email`
    - Column D: `Inquiry`

## 2. Create the Google Apps Script
1. In your Google Sheet, click `Extensions` > `Apps Script`.
2. Delete any code in the `Code.gs` file and paste the following:

const doPost = (e) => {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    // ROBUST VERSION: Gets the first sheet regardless of its name
    const sheet = doc.getSheets()[0];

    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    const newRow = headers.map(function(header) {
      if (header === 'Timestamp') return new Date();
      return e.parameter[header.toLowerCase()] || ''; // Matches name="email" etc.
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

## 3. Deploy the Web App
1. Click the blue **Deploy** button > **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in the specific details:
    - **Description**: Contact Form
    - **Execute as**: Me (your email)
    - **Who has access**: **Anyone** (This is important!)
4. Click **Deploy**.
5. Copy the **Web App URL** provided (it starts with `https://script.google.com/macros/s/...`).

## 4. Connect to Your Website
1. I (your developer) need this URL.
2. Once you provide the URL, I will update the contact form code to POST data to this address.

## Quick Test
You can test it by sending a POST request to your URL, or wait for me to integrate it into the site!
