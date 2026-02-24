/**
 * Global Configuration for Sheet Importer
 * Update SOURCE_SHEET_URL and SHEET_NAME before running.
 */
const CONFIG = {
  SOURCE_SHEET_URL: '', // Enter the source spreadsheet URL inside the quotes
  SHEET_NAME: '',       // Enter the exact name of the sheet to copy inside the quotes
  TOAST_DURATION: 3,    // Duration for toast messages to stay on screen (in seconds)
  MESSAGES: {
    DELETING: 'Existing sheet found. Deleting the current version...',
    COPYING: 'No existing sheet found. Copying the new sheet...',
    SUCCESS: 'Sheet copied successfully! 😀',
    ERROR: 'Failed to import. Check URL, sheet name, and access permissions. 😥'
  }
};

/**
 * Automatically creates a custom menu in the Google Sheets UI 
 * when the spreadsheet is opened.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  ui.createMenu('🛠️ Custom Tools') // Name of the menu in the toolbar
    .addItem('📥 Import Latest Sheet', 'importSheet') // Menu item and the function it runs
    .addToUi();
}

/**
 * Imports a specific sheet from an external spreadsheet into the active spreadsheet.
 * If a sheet with the same name already exists, it is deleted and replaced.
 */
function importSheet() {
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    // 1. Validate configuration setup
    if (!CONFIG.SOURCE_SHEET_URL || !CONFIG.SHEET_NAME) {
      throw new Error("Configuration missing: Please provide a valid SOURCE_SHEET_URL and SHEET_NAME in the CONFIG object.");
    }

    // 2. Fetch the source sheet
    const sourceSpreadsheet = SpreadsheetApp.openByUrl(CONFIG.SOURCE_SHEET_URL);
    const sourceSheet = sourceSpreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (!sourceSheet) {
      throw new Error(`Sheet "${CONFIG.SHEET_NAME}" was not found in the source spreadsheet.`);
    }

    // 3. Handle existing sheet in the destination spreadsheet
    const existingSheet = activeSpreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    if (existingSheet) {
      activeSpreadsheet.toast(CONFIG.MESSAGES.DELETING, 'Status', CONFIG.TOAST_DURATION);
      Utilities.sleep(2000);
      activeSpreadsheet.deleteSheet(existingSheet);
    } else {
      activeSpreadsheet.toast(CONFIG.MESSAGES.COPYING, 'Status', CONFIG.TOAST_DURATION);
      Utilities.sleep(2000);
    }
    
    // Ensure all pending updates are applied before copying the new sheet
    SpreadsheetApp.flush(); 

    // 4. Copy and rename the sheet
    const destinationSheet = sourceSheet.copyTo(activeSpreadsheet);
    destinationSheet.setName(CONFIG.SHEET_NAME);
    
    // Focus the newly imported sheet
    activeSpreadsheet.setActiveSheet(destinationSheet);
    
    // 5. Notify user of success
    activeSpreadsheet.toast(CONFIG.MESSAGES.SUCCESS, 'Success', CONFIG.TOAST_DURATION);
    
  } catch (err) {
    // Log the actual error to the Apps Script console for debugging
    console.error("Import Error: ", err.message);
    activeSpreadsheet.toast(CONFIG.MESSAGES.ERROR, 'Failed', CONFIG.TOAST_DURATION);
  }
}
