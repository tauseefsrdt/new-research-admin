export interface RcFormatDocument {
  id: string;
  title: string;
  filename: string;
  category: 'Thesis Submission' | 'Quality & Plagiarism' | 'Checklists' | 'Administrative & Financial' | 'General';
  description: string;
  fileType: 'pdf' | 'docx' | 'doc';
  fileSize: string;
  path: string;
}

export const RC_FORMAT_DOCUMENTS: RcFormatDocument[] = [
  {
    id: 'rc-check-list-pdf',
    title: 'Check List',
    filename: 'Check List.pdf',
    category: 'Checklists',
    description: 'General research submission and document verification check list for candidates.',
    fileType: 'pdf',
    fileSize: '196 KB',
    path: '/research/Check List.pdf',
  },
  {
    id: 'rc-checklists-rc-pdf',
    title: 'CheckLists (R&C)',
    filename: 'CheckLists (R&C).pdf',
    category: 'Checklists',
    description: 'Comprehensive Research & Consultancy Cell procedural checklist.',
    fileType: 'pdf',
    fileSize: '321 KB',
    path: '/research/CheckLists (R&C).pdf',
  },
  {
    id: 'rc-enclosures-thesis-submission-pdf',
    title: 'Enclosures for Thesis Submission (Updated)',
    filename: 'Enclosures for Thesis submission (Updated).pdf',
    category: 'Thesis Submission',
    description: 'Updated required enclosures and documentation guidelines for Ph.D. thesis submission.',
    fileType: 'pdf',
    fileSize: '493 KB',
    path: '/research/Enclosures for Thesis submission (Updated).pdf',
  },
  {
    id: 'rc-format-quality-check-docx',
    title: 'Format for Research Publication Quality Check (Word Document)',
    filename: 'FORMAT FOR RESEARCH PUBLICATION QUALITY CHECK  FOR Ph.D. THESIS.docx',
    category: 'Quality & Plagiarism',
    description: 'Editable Word format for publication quality check and validation for Ph.D. thesis.',
    fileType: 'docx',
    fileSize: '96 KB',
    path: '/research/FORMAT FOR RESEARCH PUBLICATION QUALITY CHECK  FOR Ph.D. THESIS.docx',
  },
  {
    id: 'rc-format-quality-check-pdf',
    title: 'Format for Research Publication Quality Check (PDF Document)',
    filename: 'FORMAT FOR RESEARCH PUBLICATION QUALITY CHECK  FOR Ph.D. THESIS.pdf',
    category: 'Quality & Plagiarism',
    description: 'Official quality check format and guidelines for Ph.D. thesis publication credentials.',
    fileType: 'pdf',
    fileSize: '418 KB',
    path: '/research/FORMAT FOR RESEARCH PUBLICATION QUALITY CHECK  FOR Ph.D. THESIS.pdf',
  },
  {
    id: 'rc-form-c8-plagiarism-pdf',
    title: 'FORM_C8 Plagiarism Verification Certificate',
    filename: 'FORM_C8_Plagiarism Verification Certificate.pdf',
    category: 'Quality & Plagiarism',
    description: 'Official Form C8 certification template for thesis and paper anti-plagiarism verification.',
    fileType: 'pdf',
    fileSize: '1.01 MB',
    path: '/research/FORM_C8_Plagiarism Verification Certificate.pdf',
  },
  {
    id: 'rc-no-dues-phd-pdf',
    title: 'No Dues Certificate for PhD Students (Thesis Submission)',
    filename: 'NO DUES Certificate for PhD Students ( for Thesis Submission).pdf',
    category: 'Administrative & Financial',
    description: 'Standard departmental clearance & no dues certificate required prior to thesis submission.',
    fileType: 'pdf',
    fileSize: '552 KB',
    path: '/research/NO DUES Certificate for PhD Students ( for Thesis Submission).pdf',
  },
  {
    id: 'rc-no-dues-form-pdf',
    title: 'No Dues Form',
    filename: 'No Dues form.pdf',
    category: 'Administrative & Financial',
    description: 'Institutional clearance form for research scholars and postgraduate candidates.',
    fileType: 'pdf',
    fileSize: '157 KB',
    path: '/research/No Dues form.pdf',
  },

  {
    id: 'rc-remuneration-pdf',
    title: 'Remuneration Claim Form',
    filename: 'Remuneration (2).pdf',
    category: 'Administrative & Financial',
    description: 'Official claim proforma for evaluation, examination, and research remuneration.',
    fileType: 'pdf',
    fileSize: '1.13 MB',
    path: '/research/Remuneration (2).pdf',
  },
  {
    id: 'rc-supervisor-consent-pdf',
    title: 'Supervisor Consent Form',
    filename: 'Supervisor Consent form.pdf',
    category: 'Thesis Submission',
    description: 'Official consent and endorsement proforma signed by research supervisor(s).',
    fileType: 'pdf',
    fileSize: '996 KB',
    path: '/research/Supervisor Consent form.pdf',
  },
];
