export function generateImagePreviewSrc(file) {
  if (file !== null && file.type.includes('image')) {
    return URL.createObjectURL(file);
  }
  return null;
}

export function fetchBackend(data) {
  const response = {
    success: false,
    message: '',
    data: null
  }

  const isSuccess = Math.random() > 0.5;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess) {
        response.success = true;
        response.data    = data;
        resolve(response);
      } else {
        response.message = 'Internal Server Error';
        reject(response);
      }
    }, 1500);
  });
}

export function numberToRupiah(number) {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }

  return 'Rp' + (new Intl.NumberFormat('id-ID', options).format(number));
}
