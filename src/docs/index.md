---
title: Data Dictionary
---

<style>
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1600px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
  }
  
  h1 {
    color: #1e6b7a;
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: #666;
    margin-bottom: 2rem;
  }
  
  .controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
  }
  
  .control-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #333;
  }
  
  select, input[type="text"] {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-family: Arial, sans-serif;
    font-size: 0.9rem;
    background-color: white;
  }
  
  select {
    min-width: 180px;
    cursor: pointer;
  }
  
  input[type="text"] {
    min-width: 300px;
    max-width: 400px;
  }
  
  input[type="text"]:focus,
  select:focus {
    outline: 2px solid #1e6b7a;
    outline-offset: 2px;
  }
  
  .table-wrapper {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .table-scroll {
    overflow-x: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }
  
  thead {
    background-color: #1e6b7a;
    color: white;
  }
  
  th {
    text-align: left;
    padding: 0.75rem;
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
    border-bottom: 2px solid #165561;
  }
  
  td {
    padding: 0.75rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e5e5;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  tbody tr:hover {
    background-color: #e8f4f6;
  }
  
  .required-yes {
    text-align: center;
    color: #059669;
    font-weight: 600;
  }
  
  .required-no {
    text-align: center;
    color: #6b7280;
  }
  
  .field-cell {
    font-weight: 500;
    color: #1e6b7a;
    cursor: help;
  }
  
  .example-cell,
  .notes-cell {
    color: #666;
  }
  
  .count {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #666;
  }
  
  .hidden {
    display: none;
  }
  
  /* Column widths */
  th:nth-child(1), td:nth-child(1) { min-width: 140px; }
  th:nth-child(2), td:nth-child(2) { min-width: 160px; }
  th:nth-child(3), td:nth-child(3) { min-width: 120px; }
  th:nth-child(4), td:nth-child(4) { min-width: 80px; }
  th:nth-child(5), td:nth-child(5) { min-width: 180px; }
  th:nth-child(6), td:nth-child(6) { min-width: 140px; }
  th:nth-child(7), td:nth-child(7) { min-width: 200px; }
  th:nth-child(8), td:nth-child(8) { min-width: 160px; }
  
  @media (max-width: 768px) {
    body {
      padding: 1rem;
    }
    
    .controls {
      flex-direction: column;
      align-items: stretch;
    }
    
    .control-group {
      flex-direction: column;
      align-items: stretch;
    }
    
    select, input[type="text"] {
      width: 100%;
      min-width: unset;
      max-width: unset;
    }
  }
</style>

<h1>Data Dictionary</h1>
<p class="description">Database schema reference with field definitions, types, and constraints</p>

<div class="controls">
  <div class="control-group">
    <label for="subset-filter">Filter by Data Subset:</label>
    <select id="subset-filter" aria-label="Filter by data subset">
      <option value="all">All</option>
      <option value="Customer Data">Customer Data</option>
    </select>
  </div>
  
  <div class="control-group">
    <label for="field-search">Search Field:</label>
    <input 
      type="text" 
      id="field-search" 
      placeholder="Search field names..." 
      aria-label="Search field names"
    />
  </div>
</div>

<div class="table-wrapper">
  <div class="table-scroll">
    <table id="data-table">
      <thead>
        <tr>
          <th>Data Subset</th>
          <th>Field</th>
          <th>Data Type</th>
          <th>Required</th>
          <th>Constraints</th>
          <th>Related To</th>
          <th>Example</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Physical address of the customer">address</td>
          <td>STRING(500)</td>
          <td class="required-no">−</td>
          <td></td>
          <td></td>
          <td class="example-cell">123 Main Street, New York, NY 10001</td>
          <td class="notes-cell">CUS-005</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Company or organization name">company_name</td>
          <td>STRING(255)</td>
          <td class="required-no">−</td>
          <td></td>
          <td></td>
          <td class="example-cell">Acme Corporation</td>
          <td class="notes-cell">CUS-002</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer segmentation category">customer_segment</td>
          <td>STRING(100)</td>
          <td class="required-no">−</td>
          <td>ENUM</td>
          <td></td>
          <td class="example-cell">Enterprise</td>
          <td class="notes-cell">CUS-012, SEG-001</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Debtor account identifier">debtor_account</td>
          <td>STRING(50)</td>
          <td class="required-no">−</td>
          <td></td>
          <td></td>
          <td class="example-cell">DEB-12345</td>
          <td class="notes-cell">CUS-010, FIN-001</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer email address">email_id</td>
          <td>STRING(255)</td>
          <td class="required-yes">✓</td>
          <td>UNIQUE, EMAIL_FORMAT</td>
          <td></td>
          <td class="example-cell">john.doe@example.com</td>
          <td class="notes-cell">CUS-006, VAL-001</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer's first name">first_name</td>
          <td>STRING(100)</td>
          <td class="required-yes">✓</td>
          <td>NOT NULL</td>
          <td></td>
          <td class="example-cell">John</td>
          <td class="notes-cell">CUS-003</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer's last name">last_name</td>
          <td>STRING(100)</td>
          <td class="required-yes">✓</td>
          <td>NOT NULL</td>
          <td></td>
          <td class="example-cell">Doe</td>
          <td class="notes-cell">CUS-004</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Payment terms agreed with customer">payment_term</td>
          <td>STRING(50)</td>
          <td class="required-no">−</td>
          <td>ENUM</td>
          <td></td>
          <td class="example-cell">Net 30</td>
          <td class="notes-cell">CUS-011, PAY-001</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer phone number">phone</td>
          <td>STRING(20)</td>
          <td class="required-no">−</td>
          <td>PHONE_FORMAT</td>
          <td></td>
          <td class="example-cell">+1-555-123-4567</td>
          <td class="notes-cell">CUS-007</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Customer type classification">type</td>
          <td>STRING(50)</td>
          <td class="required-yes">✓</td>
          <td>NOT NULL, ENUM</td>
          <td></td>
          <td class="example-cell">Business</td>
          <td class="notes-cell">CUS-001</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="Unique customer identifier">ucid</td>
          <td>STRING(50)</td>
          <td class="required-no">−</td>
          <td>UNIQUE</td>
          <td></td>
          <td class="example-cell">UCID-987654321</td>
          <td class="notes-cell">CUS-009</td>
        </tr>
        <tr data-subset="Customer Data">
          <td>Customer Data</td>
          <td class="field-cell" title="VAT identification number">vat_id</td>
          <td>STRING(50)</td>
          <td class="required-no">−</td>
          <td>UNIQUE</td>
          <td></td>
          <td class="example-cell">DE123456789</td>
          <td class="notes-cell">CUS-008, TAX-001</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<p class="count">
  Showing <span id="visible-count">12</span> of <span id="total-count">12</span> entries
</p>

<script>
  (function() {
    const subsetFilter = document.getElementById('subset-filter');
    const fieldSearch = document.getElementById('field-search');
    const tableBody = document.querySelector('#data-table tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const visibleCount = document.getElementById('visible-count');
    const totalCount = document.getElementById('total-count');
    
    totalCount.textContent = rows.length;
    
    function filterTable() {
      const selectedSubset = subsetFilter.value;
      const searchTerm = fieldSearch.value.toLowerCase().trim();
      let visibleRows = 0;
      
      rows.forEach(function(row) {
        const rowSubset = row.getAttribute('data-subset');
        const fieldCell = row.querySelector('td:nth-child(2)');
        const fieldText = fieldCell ? fieldCell.textContent.toLowerCase() : '';
        
        const subsetMatch = selectedSubset === 'all' || rowSubset === selectedSubset;
        const searchMatch = searchTerm === '' || fieldText.includes(searchTerm);
        
        if (subsetMatch && searchMatch) {
          row.classList.remove('hidden');
          visibleRows++;
        } else {
          row.classList.add('hidden');
        }
      });
      
      visibleCount.textContent = visibleRows;
    }
    
    subsetFilter.addEventListener('change', filterTable);
    fieldSearch.addEventListener('input', filterTable);
    
    // Initial filter
    filterTable();
  })();
</script>
