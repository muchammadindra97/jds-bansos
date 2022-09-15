import {generateImagePreviewSrc, fetchBackend, numberToRupiah, validateFile} from "@/utils/helper";

describe('generateImagePreviewSrc', () => {
  it('return string if file valid', () => {
    URL.createObjectURL = jest.fn().mockReturnValue('');

    const mockFile = {
      type: 'image/png',
    }

    expect(typeof generateImagePreviewSrc(mockFile)).toBe('string');
  });

  it('return null if file invalid', () => {
    URL.createObjectURL = jest.fn().mockReturnValue('');

    let mockFile = null;

    expect(generateImagePreviewSrc(mockFile)).toBeNull();

    mockFile = {
      type: 'other',
    }

    expect(generateImagePreviewSrc(mockFile)).toBeNull();
  });
});

describe('fetchBackend', () => {
  it('return data if success', () => {
    Math.random = jest.fn().mockReturnValue(1);

    const data = {
      key: 'value'
    }

    const expectedResult = {
      success: true,
      message: '',
      data
    }

    fetchBackend(data).then(result => {
      expect(result).toMatchObject(expectedResult);
    });
  });

  it('return error message if failed',  () => {
    Math.random = jest.fn().mockReturnValue(0);

    const data = {
      key: 'value'
    }

    const expectedResult = {
      success: false,
      message: 'Internal Server Error',
      data: null
    }

    fetchBackend(data).catch(result => {
      expect(result).toMatchObject(expectedResult);
    });
  });
});

describe('numberToRupiah', () => {
  it('return formatted number to currency', () => {
    expect(numberToRupiah(1234567.899)).toBe('Rp1.234.567,90');
  });
});

describe('validateFile', () => {
  it('return error message not an image', () => {
    expect(validateFile({
      type: 'other'
    })).toBe('File yang dipilih bukan gambar!');
  });

  it('return error message oversize', () => {
    expect(validateFile({
      type: 'image/png',
      size: 999999999
    })).toBe('Ukuran file maksimal 2 MiB!');
  });

  it('return null if file valid', () => {
    expect(validateFile({
      type: 'image/png',
      size: 999
    })).toBeNull();
  });
});