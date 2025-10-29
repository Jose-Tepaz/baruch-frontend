/**
 * Utilidades para manejar nombres de amenities
 * Los amenities ahora tienen el formato: [identifier] Name
 */

/**
 * Extrae el nombre limpio de un amenity
 * @param name - Nombre del amenity con formato [identifier] Name
 * @returns Nombre sin el prefijo [identifier]
 * @example
 * getCleanAmenityName("[4] Swimming Pool") // Returns "Swimming Pool"
 * getCleanAmenityName("Swimming Pool") // Returns "Swimming Pool"
 */
export function getCleanAmenityName(name: string): string {
  // Si el nombre tiene el formato [identifier] [identifier] Name o [identifier] Name
  // Eliminar todos los prefijos [identifier] al inicio
  let cleanName = name.trim();
  
  // Eliminar repetidamente el patrón [anything] al inicio hasta que no haya más
  while (cleanName.match(/^\[[^\]]+\]\s*/)) {
    cleanName = cleanName.replace(/^\[[^\]]+\]\s*/, '');
  }
  
  console.log('getCleanAmenityName input:', name, 'output:', cleanName);
  return cleanName.trim();
}

/**
 * Extrae el identifier de un amenity
 * @param name - Nombre del amenity con formato [identifier] Name
 * @returns Identifier o null si no tiene
 * @example
 * getAmenityIdentifier("[4] Swimming Pool") // Returns "4"
 * getAmenityIdentifier("Swimming Pool") // Returns null
 */
export function getAmenityIdentifier(name: string): string | null {
  const match = name.match(/^\[(\w+)\]/);
  return match ? match[1] : null;
}

/**
 * Crea el nombre formateado de un amenity
 * @param identifier - Identifier del amenity
 * @param name - Nombre limpio del amenity
 * @returns Nombre con formato [identifier] Name
 * @example
 * formatAmenityName("4", "Swimming Pool") // Returns "[4] Swimming Pool"
 */
export function formatAmenityName(identifier: string, name: string): string {
  return `[${identifier}] ${name}`;
}

