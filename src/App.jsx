import { useState } from 'react';
import { provisionAccount } from './provisioningLogic';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('IT Support');
  const [generatedAccount, setGeneratedAccount] = useState(null);


  function handleProvisionAccount(e) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;

    const accountDetails = provisionAccount({ firstName, lastName, department });

    setGeneratedAccount(accountDetails);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '1000px', margin: '0 auto', color: '#333' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>IT Corporate User Provisioning Simulator</h1>
        <p>Internal Identity & Access Management (IAM) tool for automated employee onboarding and Active Directory security group scaling.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
        {/* LEFT COLUMN: ONBOARDING FORM */}
        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <h3 style={{ marginTop: '0', color: '#2563eb' }}>👤 New Hire Details</h3>
          <form onSubmit={handleProvisionAccount} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="e.g., John" required style={{ padding: '8px', fontSize: '14px' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="e.g., Smith" required style={{ padding: '8px', fontSize: '14px' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px' }}>Target Corporate Department</label>
              <select value={department} onChange={e => setDepartment(e.target.value)} style={{ padding: '8px', fontSize: '14px' }}>
                <option value="IT Support">IT Support</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Operations / Warehouse">Operations / Warehouse</option>
              </select>
            </div>

            <button type="submit" style={{ padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>
              ⚙️ Provision Active Directory Account
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: ACTIVE DIRECTORY OBJECT RESULT */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#fff', minHeight: '350px' }}>
          {generatedAccount ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #10b981', paddingBottom: '10px', marginBottom: '15px' }}>
                <h3 style={{ margin: '0', color: '#10b981' }}>✅ Account Provisioned Successfully</h3>
                <span style={{ fontSize: '11px', backgroundColor: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>STATUS: ACTIVE</span>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#666', width: '35%' }}>Display Name:</td><td style={{ padding: '8px 0', fontWeight: 'bold' }}>{generatedAccount.fullName}</td></tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#666' }}>sAMAccountName:</td><td style={{ padding: '8px 0', fontFamily: 'monospace', color: '#b45309' }}>{generatedAccount.username}</td></tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#666' }}>User Principal Name:</td><td style={{ padding: '8px 0', fontWeight: '600' }}>{generatedAccount.email}</td></tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#666' }}>Temp Password:</td><td style={{ padding: '8px 0', fontFamily: 'monospace', backgroundColor: '#fef3c7', paddingLeft: '5px' }}>{generatedAccount.tempPassword}</td></tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}><td style={{ padding: '8px 0', fontWeight: 'bold', color: '#666' }}>Home Folder Path:</td><td style={{ padding: '8px 0', fontFamily: 'monospace', color: '#4b5563', fontSize: '12px' }}>{generatedAccount.homeDirectory}</td></tr>
                </tbody>
              </table>

              <div style={{ marginTop: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#4b5563' }}>🛡️ Assigned AD Security Groups (Member Of)</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {generatedAccount.securityGroups.map((group, index) => (
                    <span key={index} style={{ fontSize: '12px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb', padding: '4px 8px', borderRadius: '4px', color: '#374151', fontFamily: 'monospace' }}>
                      {group}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', flexDirection: 'column', textAlign: 'center', paddingTop: '60px' }}>
              <span style={{ fontSize: '48px' }}>🖥️</span>
              <h3>AD Domain Controller Idle</h3>
              <p style={{ maxWidth: '300px', margin: '0 auto', fontSize: '14px' }}>Fill in the starter's personal profile on the left to execute the standardized security provisioning algorithms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;