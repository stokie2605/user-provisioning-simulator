export function sanitizeNamePart(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function generateUsername(firstName, lastName) {
  const sanitizedFirst = sanitizeNamePart(firstName);
  const sanitizedLast = sanitizeNamePart(lastName);
  return sanitizedFirst.charAt(0) + sanitizedLast;
}

export function generateCorporateEmail(firstName, lastName) {
  return `${sanitizeNamePart(firstName)}.${sanitizeNamePart(lastName)}@corporate-it.com`;
}

export function generateTemporaryPassword(random = Math.random) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*';
  let password = '';
  for (let i = 0; i < 12; i += 1) {
    password += chars.charAt(Math.floor(random() * chars.length));
  }
  return `${password}1a!`;
}

export function getSecurityGroups(dept) {
  const baseGroups = ['Domain Users', 'Corporate-VPN-Access'];

  switch (dept) {
    case 'IT Support':
      return [...baseGroups, 'IT-ServiceDesk-Tier1', 'Local-Admins', 'M365-Global-Reader'];
    case 'Finance':
      return [...baseGroups, 'Finance-SAGE-Access', 'Payroll-Folder-ReadWrite', 'BACS-Transfer-Users'];
    case 'Human Resources':
      return [...baseGroups, 'HR-Personnel-Records', 'Confidential-Salary-View', 'Onboarding-SLA-Managers'];
    case 'Operations / Warehouse':
      return [...baseGroups, 'Warehouse-WMS-Cloud', 'Inventory-Audit-Users', 'Logistics-Distribution-Group'];
    default:
      return baseGroups;
  }
}

export function provisionAccount({ firstName, lastName, department, random = Math.random }) {
  const username = generateUsername(firstName, lastName);

  return {
    fullName: `${firstName} ${lastName}`,
    username,
    email: generateCorporateEmail(firstName, lastName),
    tempPassword: generateTemporaryPassword(random),
    securityGroups: getSecurityGroups(department),
    homeDirectory: `\\\\corp-storage\\home\\${username}`,
  };
}