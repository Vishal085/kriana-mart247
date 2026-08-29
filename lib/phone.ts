/**
 * Phone Number Normalization, Validation and Masking Utility
 * Supports Indian mobile numbers (10 digits, starting with 6-9, +91 / 0 prefix)
 * and standard international E.164 numbers.
 */

export interface NormalizedPhone {
  raw: string;
  e164: string; // e.g. +919876543210
  digits: string; // e.g. 919876543210 (required by Meta WhatsApp Cloud API)
  countryCode: string;
  nationalNumber: string;
  isValid: boolean;
}

/**
 * Normalize input phone string to international and Meta Cloud API formats
 */
export function normalizePhoneNumber(
  input: string | null | undefined,
  defaultCountryCode = '91'
): NormalizedPhone {
  if (!input) {
    return {
      raw: '',
      e164: '',
      digits: '',
      countryCode: defaultCountryCode,
      nationalNumber: '',
      isValid: false,
    };
  }

  const raw = String(input).trim();
  // Strip all non-digit characters except leading plus
  let cleaned = raw.replace(/[^\d+]/g, '');

  let hasPlus = cleaned.startsWith('+');
  if (hasPlus) {
    cleaned = cleaned.substring(1);
  }

  // Remove leading zeros if present
  if (cleaned.startsWith('0') && cleaned.length === 11) {
    cleaned = cleaned.substring(1);
  }

  let countryCode = defaultCountryCode;
  let nationalNumber = cleaned;

  if (cleaned.startsWith('91') && cleaned.length === 12) {
    countryCode = '91';
    nationalNumber = cleaned.substring(2);
  } else if (cleaned.length === 10) {
    countryCode = defaultCountryCode;
    nationalNumber = cleaned;
  } else if (cleaned.length > 10) {
    // If country code is prepended
    if (cleaned.startsWith('91')) {
      countryCode = '91';
      nationalNumber = cleaned.substring(2);
    } else {
      countryCode = cleaned.slice(0, cleaned.length - 10);
      nationalNumber = cleaned.slice(-10);
    }
  }

  const digits = `${countryCode}${nationalNumber}`;
  const e164 = `+${digits}`;

  // Basic validation: Indian numbers should be 10 digits starting with 6-9
  let isValid = false;
  if (countryCode === '91') {
    isValid = /^[6-9]\d{9}$/.test(nationalNumber);
  } else {
    isValid = /^\d{7,15}$/.test(digits);
  }

  return {
    raw,
    e164,
    digits,
    countryCode,
    nationalNumber,
    isValid,
  };
}

/**
 * Validate phone number
 */
export function isValidPhoneNumber(input: string | null | undefined): boolean {
  return normalizePhoneNumber(input).isValid;
}

/**
 * Mask sensitive phone number for safe logging (e.g. +91 98765 ***10)
 */
export function maskPhoneNumber(phone: string | null | undefined): string {
  if (!phone) return 'N/A';
  const norm = normalizePhoneNumber(phone);
  if (!norm.isValid) return '***';
  const digits = norm.nationalNumber;
  if (digits.length >= 10) {
    return `+${norm.countryCode} ${digits.slice(0, 5)} ***${digits.slice(-2)}`;
  }
  return `+${norm.countryCode} ***${digits.slice(-2)}`;
}
