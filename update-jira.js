require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');

const email = process.env.JIRA_EMAIL;
const token = process.env.JIRA_API_TOKEN;
const baseUrl = process.env.JIRA_BASE_URL;

async function updateJira(issueKey, message) {
  const auth = Buffer.from(`${email}:${token}`).toString('base64');

  const response = await fetch(
    `${baseUrl}/rest/api/3/issue/${issueKey}/comment`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        body: {
          type: 'doc',
          version: 1,
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: message
                }
              ]
            }
          ]
        }
      })
    }
  );

  if (response.ok) {
    console.log(`✅ Comment added to ${issueKey}`);
  } else {
    const errorText = await response.text();
    console.log(`❌ Failed: ${response.status}`, errorText);
  }
}

function getTestResult() {
  if (!fs.existsSync('test-results.json')) {
    console.log('❌ test-results.json not found');
    process.exit(1);
  }

  const report = JSON.parse(
    fs.readFileSync('test-results.json', 'utf8')
  );

  const passed = report.stats.expected;
  const failed = report.stats.unexpected;
  const skipped = report.stats.skipped;
  const flaky = report.stats.flaky;

  const total = passed + failed + skipped + flaky;

  return {
    total,
    passed,
    failed,
    skipped,
    flaky
  };
}

async function main() {
  const result = getTestResult();

  let status;

  if (result.failed > 0) {
    status = '❌ FAILED';
  } else if (result.passed > 0) {
    status = '✅ PASSED';
  } else {
    status = '⚠️ NO TESTS';
  }

  const message =
    `Playwright Automation Result: ${status}\n` +
    `Total Tests: ${result.total}\n` +
    `Passed: ${result.passed}\n` +
    `Failed: ${result.failed}\n` +
    `Skipped: ${result.skipped}\n` +
    `Flaky: ${result.flaky}`;

  console.log('\n' + message + '\n');

  await updateJira('QPJI-3', message);
}

main();