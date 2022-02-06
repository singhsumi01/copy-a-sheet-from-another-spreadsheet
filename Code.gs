/* Global variables */
const CONFIG = {
  URL: {
    /* Enter the source sheet url between '' */
    SOUCE_SHEET_URL: '',
  },
  SHEET_TO_COPY: {
    /* Enter the source sheet name between '' */
    SHEET_NAME: '',
  }
};

function importSheet() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sourceSheet = SpreadsheetApp.openByUrl(CONFIG.URL.SOUCE_SHEET_URL).getSheetByName(CONFIG.SHEET_TO_COPY.SHEET_NAME);

    /* Before copying the sheet, delete the exiting copy (if any) */
    const existingSheet = ss.getSheetByName(CONFIG.SHEET_TO_COPY.SHEET_NAME);
    if (existingSheet) {
      SpreadsheetApp.getActiveSpreadsheet().toast('Sheet found, deleting the current version.', 'Status', 3);
      Utilities.sleep(2000);
      ss.deleteSheet(existingSheet);
    } else {
      SpreadsheetApp.getActiveSpreadsheet().toast('Sheet not found, copying the new sheet.', 'Status', 3);
      Utilities.sleep(2000);
    }

    SpreadsheetApp.flush();
    const destinationSheet = sourceSheet.copyTo(ss);
    destinationSheet.setName(CONFIG.SHEET_TO_COPY.SHEET_NAME);
    ss.setActiveSheet(destinationSheet);
    SpreadsheetApp.getActiveSpreadsheet().toast('Sheet copied successfully.', 'Success 😀', 3);
  }
  catch (err) {
    SpreadsheetApp.getActiveSpreadsheet().toast('Enter the correct url and sheet name.', 'Failed 😥', 3);
  }
};
