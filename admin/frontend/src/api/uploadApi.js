import api from './axios';

/**
 * Upload an image file to backend storage in project-root/upload_image/
 * 
 * @param {File} file The binary File object
 * @param {string} module Target folder (e.g. 'institute-department', 'faculty', 'events')
 * @param {string} [oldImagePath] Existing image path to replace
 * @returns {Promise<{ url: string, filename: string, sizeBytes: number }>}
 */
export async function uploadImage(file, module = 'general', oldImagePath = '') {
  const formData = new FormData();
  formData.append('file', file);

  const params = { module };
  if (oldImagePath) {
    params.oldImagePath = oldImagePath;
  }

  const response = await api.post('/upload/image', formData, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data;
}

/**
 * Upload a PDF document to backend storage in project-root/upload_pdf/
 * 
 * @param {File} file The binary File object (PDF)
 * @param {string} module Target folder (e.g. 'patents', 'rc-documents', 'theses', 'research-papers')
 * @param {string} [oldPdfPath] Existing PDF path to replace
 * @returns {Promise<{ url: string, filename: string, sizeBytes: number }>}
 */
export async function uploadPdf(file, module = 'general', oldPdfPath = '') {
  const formData = new FormData();
  formData.append('file', file);

  const params = { module };
  if (oldPdfPath) {
    params.oldPdfPath = oldPdfPath;
  }

  const response = await api.post('/upload/pdf', formData, {
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data?.data;
}

/**
 * Delete an uploaded image file
 * @param {string} imagePath
 */
export async function deleteUploadedImage(imagePath) {
  const response = await api.delete('/upload/image', {
    params: { imagePath },
  });
  return response.data?.data;
}

/**
 * Delete an uploaded PDF file
 * @param {string} pdfPath
 */
export async function deleteUploadedPdf(pdfPath) {
  const response = await api.delete('/upload/pdf', {
    params: { pdfPath },
  });
  return response.data?.data;
}

/**
 * Delete any uploaded file (image or PDF)
 * @param {string} filePath
 */
export async function deleteUploadedFile(filePath) {
  const response = await api.delete('/upload/file', {
    params: { filePath },
  });
  return response.data?.data;
}

