import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateCorporateEmail,
  generateTemporaryPassword,
  generateUsername,
  getSecurityGroups,
  provisionAccount,
  sanitizeNamePart,
} from '../src/provisioningLogic.js';

test('sanitizes name parts for identity-safe account generation', () => {
  assert.equal(sanitizeNamePart('  De-an! '), 'dean');
  assert.equal(sanitizeNamePart(' O\'Connor '), 'oconnor');
});

test('generates corporate usernames and email addresses from sanitized names', () => {
  assert.equal(generateUsername('Dean', 'Wilshaw'), 'dwilshaw');
  assert.equal(generateUsername(' Amy-Lou ', ' O\'Connor '), 'aoconnor');
  assert.equal(generateUsername('A', 'VeryLongLastNameThatExceedsTwentyCharacters'), 'averylonglastnametha');
  assert.equal(generateUsername('', ''), 'tempuser');
  assert.equal(generateCorporateEmail(' Amy-Lou ', ' O\'Connor '), 'amylou.oconnor@corporate-it.com');
});

test('generates temporary passwords with required length and complexity suffix', () => {
  const password = generateTemporaryPassword(() => 0);

  assert.equal(password.length, 15);
  assert.match(password, /1a!$/);
  assert.match(password, /^[A-Z]{12}1a!$/);
});

test('maps departments onto base and role-specific security groups', () => {
  assert.deepEqual(getSecurityGroups('Unknown'), ['Domain Users', 'Corporate-VPN-Access']);
  assert.deepEqual(getSecurityGroups('Finance'), [
    'Domain Users',
    'Corporate-VPN-Access',
    'Finance-SAGE-Access',
    'Payroll-Folder-ReadWrite',
    'BACS-Transfer-Users',
  ]);
});

test('provisions a full account object with deterministic password support', () => {
  const account = provisionAccount({ firstName: 'Dean', lastName: 'Wilshaw', department: 'IT Support', random: () => 0 });

  assert.equal(account.fullName, 'Dean Wilshaw');
  assert.equal(account.username, 'dwilshaw');
  assert.equal(account.email, 'dean.wilshaw@corporate-it.com');
  assert.equal(account.tempPassword, 'AAAAAAAAAAAA1a!');
  assert.equal(account.homeDirectory, '\\\\corp-storage\\home\\dwilshaw');
  assert.ok(account.securityGroups.includes('IT-ServiceDesk-Tier1'));
});