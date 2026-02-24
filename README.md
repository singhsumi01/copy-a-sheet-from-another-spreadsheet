# Google Sheets: Remote Sheet Importer

A lightweight and robust Google Apps Script utility that seamlessly imports a specific sheet from an external Google Spreadsheet into your active workbook. If a sheet with the same name already exists in your current workbook, it safely deletes the old version and replaces it with the fresh copy.

## ✨ Features

* **Plug-and-Play Configuration:** Easily configure the source URL and target sheet name at the top of the script.
* **Auto-Replacement:** Automatically detects if an older version of the sheet exists and replaces it to avoid duplicate `(Copy of...)` sheets.
* **UI Feedback:** Uses built-in Google Sheets "Toast" notifications to keep the user informed of the script's progress (Deleting, Copying, Success, Error).
* **Error Logging:** Fails gracefully and logs exact error messages to the Apps Script execution log for easy debugging.

## 🚀 Setup & Installation

1. Open your target Google Spreadsheet (the one you want to import *into*).
2. Click on **Extensions** > **Apps Script** in the top menu.
3. Delete any code in the script editor and paste the code from `importSheet.gs`.
4. Update the `CONFIG` variables at the top of the file:
   ```javascript
   const CONFIG = {
     SOURCE_SHEET_URL: '[https://docs.google.com/spreadsheets/d/your-source-url-here/edit](https://docs.google.com/spreadsheets/d/your-source-url-here/edit)', 
     SHEET_NAME: 'DataSheet1', // The exact name of the tab you want to copy
     // ...
   };
