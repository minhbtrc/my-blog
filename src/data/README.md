# Certificate Management System

This directory contains data files used throughout the application, including the certificates system.

## Certificates

The certificates system is designed to make it easy to add, update, and display professional certifications and academic achievements directly on the About page.

### How to Add New Certificates

1. Open `src/db/certificates.json`
2. Add a new certificate entry to the JSON array
3. Fill in the required fields:
   - `name`: The name/title of the certificate
   - `issuer`: The organization that issued the certificate
   - `date`: When the certificate was issued (format: "MMM YYYY")
   - `url`: URL to the certificate verification page
4. Add optional fields as needed:
   - `description`: A brief description of the certificate
   - `categories`: Array of categories/tags for the certificate

### Example Certificate Entry

```json
{
  "name": "Deep Learning Specialization",
  "issuer": "Coursera",
  "date": "May 2023",
  "url": "https://www.coursera.org/account/accomplishments/specialization/certificate/XXXXXXXXXXX",
  "description": "Five-course specialization by Andrew Ng covering neural networks, optimization algorithms, and ML projects structuring",
  "categories": ["AI", "Deep Learning", "Neural Networks"]
}
```

### Certificate Display

All certificates are displayed directly on the About page in the Certifications section. They are shown in the order they appear in the certificates.json array, so you can manually arrange them as needed (typically with newest first).

The certificates are displayed with the following information:
- Certificate name (linked to the verification URL)
- Issuing organization
- Date of issuance

Each certificate entry is clickable and will open the verification URL in a new tab.

### System Structure

- `src/db/certificates.json`: JSON file containing all certificates data
- `src/data/certificates.ts`: TypeScript interface and helper functions for certificates
- The certificates are rendered in the About page using the existing `CertificationCard` component 