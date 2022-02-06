/* Global variables */
const CONFIG = {
  URL: {
    /* Enter the source sheet url between '' */
    SOUCE_SHEET_URL: '',
  },
  SHEET_TO_COPY: {
    /* Enter the source sheet name between '' */
    SHEET_NAME: '',
  },
  SPREADSHEET: {
    ACTIVE_SPREADSHEET: SpreadsheetApp.getActiveSpreadsheet(),
  }
};

function importSheet() {
  try {
    const sourceSheet = SpreadsheetApp.openByUrl(CONFIG.URL.SOUCE_SHEET_URL).getSheetByName(CONFIG.SHEET_TO_COPY.SHEET_NAME);

    /* Before copying the sheet, delete the exiting copy (if any) */
    const existingSheet = CONFIG.SPREADSHEET.ACTIVE_SPREADSHEET.getSheetByName(CONFIG.SHEET_TO_COPY.SHEET_NAME);
    if (existingSheet) {
      SpreadsheetApp.getActiveSpreadsheet().toast('Sheet found, deleting the current version.', 'Status');
      Utilities.sleep(2000);
      CONFIG.SPREADSHEET.ACTIVE_SPREADSHEET.deleteSheet(existingSheet);
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast('Sheet not found, copying the new sheet.', 'Status');
      Utilities.sleep(2000);
    }

    SpreadsheetApp.flush();
    const destinationSheet = sourceSheet.copyTo(CONFIG.SPREADSHEET.ACTIVE_SPREADSHEET);
    destinationSheet.setName(CONFIG.SHEET_TO_COPY.SHEET_NAME);
    CONFIG.SPREADSHEET.ACTIVE_SPREADSHEET.setActiveSheet(destinationSheet);
    SpreadsheetApp.getActiveSpreadsheet().toast('Sheet copied successfully.', 'Success 😀');
  }
  catch (err) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Enter the correct url and sheet name.', 'Failed 😥');
  }
};
