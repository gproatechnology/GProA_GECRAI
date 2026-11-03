/**
 * Tests unitarios para las utilidades de validación de GECRAI (NOM-001-SEDE-2012).
 * Pruebas para las funciones de validación de voltajes, potencia, longitud y factor de potencia.
 */

import {
  describe,
  expect,
  test,
} from 'vitest'
import {
  esCombinacionValida,
  obtenerMensajeErrorCombinacion,
  obtenerVoltajesValidos,
  esPotenciaValida,
  obtenerMensajeErrorPotencia,
  esLongitudValida,
  obtenerMensajeErrorLongitud,
  esFactorPotenciaValido,
  obtenerMensajeErrorFactorPotencia,
} from './nom001-validation'

describe('Voltajes válidos por número de fases (NOM-001)', () => {
  test('debería devolver voltajes válidos para 1 fase', () => {
    const voltajes = obtenerVoltajesValidos(1)
    expect(voltajes).toEqual([115, 200, 208, 230])
  })

  test('debería devolver voltajes válidos para 2 fases', () => {
    const voltajes = obtenerVoltajesValidos(2)
    expect(voltajes).toEqual([115, 230, 460, 575, 2300])
  })

  test('debería devolver voltajes válidos para 3 fases', () => {
    const voltajes = obtenerVoltajesValidos(3)
    expect(voltajes).toEqual([115, 200, 208, 230, 460, 575, 2300])
  })

  test('debería devolver array vacío para número de fases inválido', () => {
    const voltajes = obtenerVoltajesValidos(5)
    expect(voltajes).toEqual([])
  })
})

describe('Validación de combinación voltaje/fases', () => {
  test('1 fase - 115V debería ser válido', () => {
    expect(esCombinacionValida(1, 115)).toBe(true)
  })

  test('1 fase - 200V debería ser válido', () => {
    expect(esCombinacionValida(1, 200)).toBe(true)
  })

  test('1 fase - 220V NO debería ser válido', () => {
    expect(esCombinacionValida(1, 220)).toBe(false)
  })

  test('3 fases - 460V debería ser válido', () => {
    expect(esCombinacionValida(3, 460)).toBe(true)
  })

  test('3 fases - 220V NO debería ser válido', () => {
    expect(esCombinacionValida(3, 220)).toBe(false)
  })

  test('3 fases - 115V debería ser válido', () => {
    expect(esCombinacionValida(3, 115)).toBe(true)
  })

  test('2 fases - 460V debería ser válido', () => {
    expect(esCombinacionValida(2, 460)).toBe(true)
  })

  test('2 fases - 440V NO debería ser válido', () => {
    expect(esCombinacionValida(2, 440)).toBe(false)
  })

  test('número de fases inválido debería retornar false', () => {
    expect(esCombinacionValida(0, 220)).toBe(false)
    expect(esCombinacionValida(4, 220)).toBe(false)
  })

  test('debería retornar mensaje de error para combinación inválida', () => {
    const mensaje = obtenerMensajeErrorCombinacion(1, 440)
    expect(mensaje).toContain('440 V')
    expect(mensaje).toContain('1 fase')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar null para combinación válida', () => {
    const mensaje = obtenerMensajeErrorCombinacion(3, 460)
    expect(mensaje).toBeNull()
  })

  test('debería retornar mensaje de error para fases inválidas', () => {
    const mensaje = obtenerMensajeErrorCombinacion(5, 220)
    expect(mensaje).toContain('5')
    expect(mensaje).not.toBeNull()
  })
})

describe('Validación de potencia (HP)', () => {
  test('0.5 HP debería ser válido', () => {
    expect(esPotenciaValida(0.5)).toBe(true)
  })

  test('1 HP debería ser válido', () => {
    expect(esPotenciaValida(1)).toBe(true)
  })

  test('20 HP debería ser válido', () => {
    expect(esPotenciaValida(20)).toBe(true)
  })

  test('100 HP debería ser válido', () => {
    expect(esPotenciaValida(100)).toBe(true)
  })

  test('500 HP debería ser válido', () => {
    expect(esPotenciaValida(500)).toBe(true)
  })

  test('0 HP NO debería ser válido', () => {
    expect(esPotenciaValida(0)).toBe(false)
  })

  test('0.4 HP NO debería ser válido', () => {
    expect(esPotenciaValida(0.4)).toBe(false)
  })

  test('501 HP NO debería ser válido', () => {
    expect(esPotenciaValida(501)).toBe(false)
  })

  test('1000 HP NO debería ser válido', () => {
    expect(esPotenciaValida(1000)).toBe(false)
  })

  test('debería retornar mensaje de error para potencia menor a 0.5', () => {
    const mensaje = obtenerMensajeErrorPotencia(0)
    expect(mensaje).toContain('0.5 HP')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar mensaje de error para potencia mayor a 500', () => {
    const mensaje = obtenerMensajeErrorPotencia(1000)
    expect(mensaje).toContain('500 HP')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar null para potencia válida', () => {
    const mensaje = obtenerMensajeErrorPotencia(20)
    expect(mensaje).toBeNull()
  })
})

describe('Validación de longitud', () => {
  test('0.001 km debería ser válido', () => {
    expect(esLongitudValida(0.001)).toBe(true)
  })

  test('1 km debería ser válido', () => {
    expect(esLongitudValida(1)).toBe(true)
  })

  test('100 km debería ser válido', () => {
    expect(esLongitudValida(100)).toBe(true)
  })

  test('0 km NO debería ser válido', () => {
    expect(esLongitudValida(0)).toBe(false)
  })

  test('0.0001 km debería ser válido', () => {
    expect(esLongitudValida(0.0001)).toBe(true)
  })

  test('101 km NO debería ser válido', () => {
    expect(esLongitudValida(101)).toBe(false)
  })

  test('1000 km NO debería ser válido', () => {
    expect(esLongitudValida(1000)).toBe(false)
  })

  test('debería retornar mensaje de error para longitud menor o igual a 0', () => {
    const mensaje = obtenerMensajeErrorLongitud(0)
    expect(mensaje).toContain('mayor a 0 km')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar mensaje de error para longitud mayor a 100', () => {
    const mensaje = obtenerMensajeErrorLongitud(101)
    expect(mensaje).toContain('100 km')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar null para longitud válida', () => {
    const mensaje = obtenerMensajeErrorLongitud(50)
    expect(mensaje).toBeNull()
  })
})

describe('Validación de factor de potencia', () => {
  test('0.1 debería ser válido', () => {
    expect(esFactorPotenciaValido(0.1)).toBe(true)
  })

  test('0.5 debería ser válido', () => {
    expect(esFactorPotenciaValido(0.5)).toBe(true)
  })

  test('0.85 debería ser válido', () => {
    expect(esFactorPotenciaValido(0.85)).toBe(true)
  })

  test('1 debería ser válido', () => {
    expect(esFactorPotenciaValido(1)).toBe(true)
  })

  test('0 NO debería ser válido', () => {
    expect(esFactorPotenciaValido(0)).toBe(false)
  })

  test('-0.1 NO debería ser válido', () => {
    expect(esFactorPotenciaValido(-0.1)).toBe(false)
  })

  test('1.1 NO debería ser válido', () => {
    expect(esFactorPotenciaValido(1.1)).toBe(false)
  })

  test('2 NO debería ser válido', () => {
    expect(esFactorPotenciaValido(2)).toBe(false)
  })

  test('debería retornar mensaje de error para FP menor o igual a 0', () => {
    const mensaje = obtenerMensajeErrorFactorPotencia(0)
    expect(mensaje).toContain('mayor a 0')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar mensaje de error para FP mayor a 1', () => {
    const mensaje = obtenerMensajeErrorFactorPotencia(2)
    expect(mensaje).toContain('máximo es 1')
    expect(mensaje).not.toBeNull()
  })

  test('debería retornar null para FP válido', () => {
    const mensaje = obtenerMensajeErrorFactorPotencia(0.85)
    expect(mensaje).toBeNull()
  })
})
