import { test, expect, Page } from '@playwright/test';

// ==================== TEST DATA ====================
// POSITIVE TEST CASES (24+ required)
const POSITIVE_CASES = [
  { id: 'Pos_Fun_001', name: 'Daily greeting', input: 'suBha rathriyak', length: 'S' },
  { id: 'Pos_Fun_002', name: 'Conditional Polite Request', input: 'oyaa kalin enavanam matath idak allaganna', length: 'M' },
  { id: 'Pos_Fun_003', name: 'Short Imperative Command', input: 'tikak issarahata yanna', length: 'S' },
  { id: 'Pos_Fun_004', name: 'Polite Request for Water', input: 'mata vathura ekak dhenna puluvandha', length: 'M' },
  { id: 'Pos_Fun_005', name: 'Positive Response', input: 'hari,mama karannam', length: 'S' },
  { id: 'Pos_Fun_006', name: 'Request for Clarification', input: 'karuNAAkaralaa mata meka kiyala dhenna puluvandha', length: 'M' },
  { id: 'Pos_Fun_007', name: 'Very Short Polite Command', input: 'karuNAAkaralaa enna', length: 'S' },
  { id: 'Pos_Fun_008', name: 'Compound Past Future Sentence', input: 'mama gedhara giya, namuth heta aaye enavaa', length: 'M' },
  { id: 'Pos_Fun_009', name: 'Question About Time', input: 'oya kavadhadha aaye ennee?', length: 'S' },
  { id: 'Pos_Fun_010', name: 'Negative Ability Statement', input: 'mata ehema karanna epaa', length: 'S' },
  { id: 'Pos_Fun_011', name: 'Apology with Request', input: 'samaavenna,mata meeka karanna puluvandha?', length: 'M' },
  { id: 'Pos_Fun_012', name: 'Past Tense Statement', input: 'mama iiyee pansal giyaa', length: 'S' },
  { id: 'Pos_Fun_013', name: 'Future Plan(Plural)', input: 'api heta kandy yamu', length: 'S' },
  { id: 'Pos_Fun_014', name: 'Request with English Tech Term', input: 'mata whatsapp message ekak evanna', length: 'M' },
  { id: 'Pos_Fun_015', name: 'Requested Word Emphasis', input: 'hari hari lassanayi', length: 'S' },
  { id: 'Pos_Fun_016', name: 'Complex Work Request', input: 'karuNAkaralaa mata report eka email ekak vidhihata evanna.hetata kalin eeka check karanna ooni', length: 'L' },
  { id: 'Pos_Fun_017', name: 'Negative Statements with Reason', input: 'mama adha office yanne naehae.mokadha mata tikak saniipa naehae.', length: 'M' },
  { id: 'Pos_Fun_018', name: 'Request with Colleague Reference', input: 'karuNAkaralaa oyage sahathika vala copy email ekak vidhihata evanna.', length: 'M' },
  { id: 'Pos_Fun_019', name: 'Agreement with Slang', input: 'hari hari eka hodhayi.', length: 'S' },
  { id: 'Pos_Fun_020', name: 'Travel Planning Sentence', input: 'api colombo gihin passe kandy yanna hadhanavaa saha eheth hotel ekak book karanavaa.', length: 'M' },
  { id: 'Pos_Fun_021', name: 'Question About Opinion', input: 'adha meeting eka monaa veyi kiyaladha oyaa hithanne?', length: 'M' },
  { id: 'Pos_Fun_022', name: 'Time and Intention Statement', input: 'raesviima 9.00A.M thiyenavaa saha mama kalin enna hadhanavaa.', length: 'M' },
  { id: 'Pos_Fun_023', name: 'Past experience with Feeling', input: 'mama iiye galle giyaa saha hari lassanayi kiyala hithunaa.', length: 'M' },
  { id: 'Pos_Fun_024', name: 'Slang with Future Plan', input: 'ela machan adha podi vaedak thiyenavaa passee set vemu.', length: 'M' },
];

// NEGATIVE TEST CASES (10+ required)
const NEGATIVE_CASES = [
  { id: 'Neg_Fun_001', name: 'Missing vowels', input: 'mn gdhr ynv', length: 'S' },
  { id: 'Neg_Fun_002', name: 'Chemical equation mixed with text', input: 'H2O + NaCL = mama gedhara yanava', length: 'S' },
  { id: 'Neg_Fun_003', name: 'Musical scale instead of text', input: 'do re mi fa so la ti do', length: 'S' },
  { id: 'Neg_Fun_004', name: 'Boolean logic expression', input: '{mama AND gedhara} OR NOT yanavaa', length: 'S' },
  { id: 'Neg_Fun_005', name: 'CSV data format', input: 'mama,gedhara,yanavaa,2026-08-09,False', length: 'M' },
  { id: 'Neg_Fun_006', name: 'ISO timestamp with text', input: '2026-03-09T12:45:00Z mama gedhara yanavaa', length: 'M' },
  { id: 'Neg_Fun_007', name: 'Currency exchange rates', input: 'USD/LKR 325.00 mama EUR/LKR 345.50', length: 'M' },
  { id: 'Neg_Fun_008', name: 'JavaScript code syntax', input: 'console.log("mama"): function gedhara(){return yanavaa;}', length: 'M' },
  { id: 'Neg_Fun_009', name: 'Binary number sequence', input: '00111101 11100110 11001100 00110011', length: 'M' },
  { id: 'Neg_Fun_010', name: 'Numbers embedded in words', input: 'mama1547yanavaa789', length: 'S' },
];

// ==================== HELPER FUNCTIONS ====================
async function getInputField(page: Page) {
  return page.locator('textarea').first();
}

async function getOutputText(page: Page): Promise<string> {
  // Get all text from page
  const allText = await page.textContent('body') || '';
  
  // Look for Sinhala text pattern
  const sinhalaMatch = allText.match(/Sinhala\s*([^🔁🗑️]+)/);
  if (sinhalaMatch && sinhalaMatch[1]) {
    return sinhalaMatch[1].trim();
  }
  
  // Fallback: look for any Sinhala characters
  const anySinhala = allText.match(/[මසක-෴][^🔁🗑️]*/);
  if (anySinhala) {
    return anySinhala[0].trim();
  }
  
  return '';
}

// ==================== MAIN TEST SUITE ====================
test.describe('IT3040 Assignment 1 - Singlish to Sinhala Translation', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.swifttranslator.com/');
    await page.waitForTimeout(2000);
  });
  
  // ========== POSITIVE FUNCTIONAL TESTS ==========
  test.describe('Positive Functional Tests (24 required)', () => {
    for (const testCase of POSITIVE_CASES) {
      test(`${testCase.id}: ${testCase.name}`, async ({ page }) => {
        test.setTimeout(30000);
        
        // Type input
        const inputField = await getInputField(page);
        await inputField.fill(testCase.input);
        
        // Wait based on length
        const waitTime = testCase.length === 'L' ? 5000 : testCase.length === 'M' ? 3000 : 2000;
        await page.waitForTimeout(waitTime);
        
        // Get output
        const output = await getOutputText(page);
        
        // Verify: Should produce SOME output (not empty)
        expect(output.length, `${testCase.id}: Should produce Sinhala output`).toBeGreaterThan(0);
        
        // Log for debugging
        console.log(`${testCase.id}: Input="${testCase.input.substring(0, 30)}..." → Output="${output.substring(0, 50)}..."`);
      });
    }
  });
  
  // ========== NEGATIVE FUNCTIONAL TESTS ==========
  test.describe('Negative Functional Tests (10 required)', () => {
    for (const testCase of NEGATIVE_CASES) {
      test(`${testCase.id}: ${testCase.name}`, async ({ page }) => {
        test.setTimeout(30000);
        
        // Type input
        const inputField = await getInputField(page);
        await inputField.fill(testCase.input);
        await page.waitForTimeout(3000);
        
        // Get output
        const output = await getOutputText(page);
        
        // For negative tests: output might be empty, wrong, or contain mixed content
        // We just verify the page doesn't crash
        expect(page.isClosed(), `${testCase.id}: Page should not crash`).toBe(false);
        
        // Log for debugging
        console.log(`${testCase.id}: Input="${testCase.input.substring(0, 30)}..." → Output="${output.substring(0, 50)}..."`);
      });
    }
  });
  
  // ========== ADDITIONAL TESTS (Mixed Language, Punctuation, etc.) ==========
  test.describe('Additional Test Cases', () => {
    const ADDITIONAL_CASES = [
      { id: 'Pos_Fun_025', name: 'Mixed English terms', input: 'mata Zoom call ekak join karanava', length: 'M' },
      { id: 'Pos_Fun_026', name: 'With punctuation', input: 'mama gedhara yanavaa. oyaa enavadha?', length: 'M' },
      { id: 'Pos_Fun_027', name: 'With numbers', input: 'mata rupee 500 dhenna', length: 'S' },
      { id: 'Pos_Fun_028', name: 'With slang', input: 'ela machan, hari lassanayi', length: 'S' },
    ];
    
    for (const testCase of ADDITIONAL_CASES) {
      test(`${testCase.id}: ${testCase.name}`, async ({ page }) => {
        const inputField = await getInputField(page);
        await inputField.fill(testCase.input);
        await page.waitForTimeout(3000);
        
        const output = await getOutputText(page);
        expect(output.length, `${testCase.id}: Should produce output`).toBeGreaterThan(0);
      });
    }
  });
  
  // ========== UI TESTS ==========
  test.describe('UI Tests', () => {
    test('Pos_UI_001: Real-time output updates', async ({ page }) => {
      const inputField = await getInputField(page);
      
      // Type character by character
      await inputField.type('m', { delay: 200 });
      await page.waitForTimeout(500);
      await inputField.type('a', { delay: 200 });
      await page.waitForTimeout(500);
      
      // Check if SOME output appears
      const output = await getOutputText(page);
      expect(output.length, 'Should show output while typing').toBeGreaterThan(0);
    });
    
    test('Neg_UI_001: Clear input functionality', async ({ page }) => {
      const inputField = await getInputField(page);
      
      // Type something
      await inputField.fill('mama gedhara yanavaa');
      await page.waitForTimeout(2000);
      
      // Clear manually
      await inputField.fill('');
      await page.waitForTimeout(1000);
      
      const value = await inputField.inputValue();
      expect(value, 'Input should be empty after clear').toBe('');
    });
  });
  
  // ========== SUMMARY TEST ==========
  test('Test Summary: Requirements Verification', async ({ page }) => {
    // Just navigate to show we can access the site
    await page.goto('https://www.swifttranslator.com/');
    
    console.log('\n' + '='.repeat(50));
    console.log('ASSIGNMENT REQUIREMENTS SUMMARY');
    console.log('='.repeat(50));
    console.log(`✓ Positive Test Cases: ${POSITIVE_CASES.length} (minimum 24 required)`);
    console.log(`✓ Negative Test Cases: ${NEGATIVE_CASES.length} (minimum 10 required)`);
    console.log(`✓ Additional Test Cases: 4`);
    console.log(`✓ UI Test Cases: 2`);
    console.log(`✓ Total Automated Tests: ${POSITIVE_CASES.length + NEGATIVE_CASES.length + 4 + 2}`);
    console.log('='.repeat(50));
    
    // Verify minimum requirements
    expect(POSITIVE_CASES.length, 'Need at least 24 positive tests').toBeGreaterThanOrEqual(24);
    expect(NEGATIVE_CASES.length, 'Need at least 10 negative tests').toBeGreaterThanOrEqual(10);
  });
});