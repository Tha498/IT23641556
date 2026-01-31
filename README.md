Project Overview This test suite contains automated test for SwiftTransalator Singlish to sinhala conversion system using Playwright.
-24 positive functional scenarios -10 negative functiona scenarios -1 UI negative test senario

Requirements / Prerequisites
Tell the reader what they need to run the project: Node.js and Playwright.

Requirements

Node.js installed
Playwright installed
Installation Instructions
Step-by-step instructions to set up the project on computer.

Clone the Git repository:
git clone https://github.com/Tha498/IT23641556.git
Go into the project folder:
cd IT23641556

Install the dependencies:
npm install

Running the Tests
Explain how to run your Playwright tests.

Running the Tests
To run all tests, use this command:

npx playwright test

To open the Playwright report in the browser after running tests:

npx playwright show-report

Test Cases
Briefly explain what kind of test cases are included.

Test Cases The tests cover:

Positive functional tests (correct conversion)
Negative functional tests (invalid or tricky input)
UI behavior tests (real-time output)
Notes / Extra Information
Optional section for any other info: e.g., browser requirements, special instructions.

Notes

Tests use Chromium by default.
Ensure you have a stable internet connection to open the website.
All tests are located in the tests/ folder.
