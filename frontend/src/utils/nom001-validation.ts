/**
 * Reglas de validación para cálculos eléctricos NOM-001-SEDE-2012.
 * Define las combinaciones válidas de voltaje y número de fases.
 *
 * Estos valores están sincronizados con las tablas del backend en
 * backend/app/services/nom001_tables.py
 */

export const VOLTAJES_POR_FASES: Record<number, number[]> = {
  1: [115, 200, 208, 230],
  2: [115, 230, 460, 575, 2300],
  3: [115, 200, 208, 230, 460, 575, 2300],
} as const;

export type NumeroFases = 1 | 2 | 3;

/**
 * Verifica si una combinación de fases y voltaje es válida según NOM-001.
 * @param fases - Número de fases (1, 2 o 3)
 * @param voltaje - Voltaje del sistema en voltios
 * @returns true si la combinación es válida, false en caso contrario
 */
export function esCombinacionValida(fases: number, voltaje: number): boolean {
  const voltajesValidos = VOLTAJES_POR_FASES[fases];
  if (!voltajesValidos) {
    return false;
  }
  return voltajesValidos.includes(voltaje);
}

/**
 * Obtiene el mensaje de error para una combinación inválida de fases y voltaje.
 * @param fases - Número de fases (1, 2 o 3)
 * @param voltaje - Voltaje del sistema en voltios
 * @returns Mensaje de error descriptivo o null si la combinación es válida
 */
export function obtenerMensajeErrorCombinacion(
  fases: number,
  voltaje: number,
): string | null {
  if (esCombinacionValida(fases, voltaje)) {
    return null;
  }

  const voltajesValidos = VOLTAJES_POR_FASES[fases];
  if (!voltajesValidos) {
    return `El número de fases "${fases}" no es válido. Use 1, 2 o 3 fases.`;
  }

  return `El voltaje ${voltaje} V no es válido para ${fases} fase${
    fases > 1 ? 's' : ''
  } según NOM-001-SEDE-2012. Voltajes permitidos: ${voltajesValidos.join(
    ', ',
  )} V.`;
}

/**
 * Obtiene la lista de voltajes válidos para un número de fases dado.
 * @param fases - Número de fases (1, 2 o 3)
 * @returns Array de voltajes válidos o array vacío si las fases no son válidas
 */
export function obtenerVoltajesValidos(fases: number): number[] {
  return VOLTAJES_POR_FASES[fases] ?? [];
}

/**
 * Valida que el valor de potencia (HP) esté dentro del rango permitido.
 * @param hp - Potencia en caballos de fuerza
 * @returns true si el valor está en el rango válido (0.5 a 500 HP)
 */
export function esPotenciaValida(hp: number): boolean {
  return hp >= 0.5 && hp <= 500;
}

/**
 * Obtiene el mensaje de error para una potencia inválida.
 * @param hp - Potencia en caballos de fuerza
 * @returns Mensaje de error o null si es válido
 */
export function obtenerMensajeErrorPotencia(hp: number): string | null {
  if (esPotenciaValida(hp)) {
    return null;
  }
  if (hp < 0.5) {
    return 'La potencia mínima es 0.5 HP.';
  }
  return 'La potencia máxima es 500 HP.';
}

/**
 * Valida que el valor de longitud esté dentro del rango permitido.
 * @param longitud - Longitud en kilómetros
 * @returns true si el valor está en el rango válido (0.001 a 100 km)
 */
export function esLongitudValida(longitud: number): boolean {
  return longitud > 0 && longitud <= 100;
}

/**
 * Obtiene el mensaje de error para una longitud inválida.
 * @param longitud - Longitud en kilómetros
 * @returns Mensaje de error o null si es válido
 */
export function obtenerMensajeErrorLongitud(longitud: number): string | null {
  if (esLongitudValida(longitud)) {
    return null;
  }
  if (longitud <= 0) {
    return 'La longitud debe ser mayor a 0 km.';
  }
  return 'La longitud máxima es 100 km.';
}

/**
 * Valida que el factor de potencia esté dentro del rango permitido.
 * @param fp - Factor de potencia (0 a 1)
 * @returns true si el valor está en el rango válido
 */
export function esFactorPotenciaValido(fp: number): boolean {
  return fp > 0 && fp <= 1;
}

/**
 * Obtiene el mensaje de error para un factor de potencia inválido.
 * @param fp - Factor de potencia
 * @returns Mensaje de error o null si es válido
 */
export function obtenerMensajeErrorFactorPotencia(fp: number): string | null {
  if (esFactorPotenciaValido(fp)) {
    return null;
  }
  if (fp <= 0) {
    return 'El factor de potencia debe ser mayor a 0.';
  }
  return 'El factor de potencia máximo es 1.';
}
