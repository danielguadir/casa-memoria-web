/**
 * Módulo de Utilidades de Seguridad - Casa de la Memoria Cumbal
 * Sanitización de entradas, prevención de XSS y utilidades de validación estricta.
 */

/**
 * Sanitiza una cadena de texto eliminando caracteres potencialmente peligrosos y tags HTML
 * para prevenir inyecciones XSS (Cross-Site Scripting).
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Valida de forma estricta el formato de un correo electrónico según estándar RFC 5322.
 */
export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Valida la complejidad de contraseñas para futuros módulos de registro.
 */
export function validatePasswordStrength(password: string): { isValid: boolean; message?: string } {
  if (password.length < 8) {
    return { isValid: false, message: 'La contraseña debe tener al menos 8 caracteres.' };
  }
  return { isValid: true };
}
