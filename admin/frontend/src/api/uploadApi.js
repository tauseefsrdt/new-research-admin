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

  // Axios automatically adds boundary when Content-Type is multipart/form-data
  const response = await api.post('/upload/image', formData, {
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
