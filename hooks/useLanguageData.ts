import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './useLanguage';
import { usePathname } from 'next/navigation';
import { getCurrentLocale } from '@/utils/get-current-locale';

export function useLanguageData<T>(
  fetchFunction: (locale: string) => Promise<T>,
  initialData: T,
  dependencies: any[] = []
) {
  const { currentLanguage } = useLanguage();
  const pathname = usePathname();
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceRefresh, setForceRefresh] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const previousLanguage = useRef<string>('');
  const previousDependencies = useRef<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      if (loading) return;

      const actualLocale = getCurrentLocale();
      
      // Si es la primera carga y el idioma no ha cambiado, mantener los datos iniciales
      if (isInitialLoad && previousLanguage.current === '' && initialData && 
          (Array.isArray(initialData) ? initialData.length > 0 : 
           (typeof initialData === 'object' && initialData !== null))) {
        
        console.log('=== useLanguageData: Using initial data for first load ===');
        console.log('Initial data:', initialData);
        console.log('Current language:', actualLocale);
        
        previousLanguage.current = actualLocale;
        previousDependencies.current = [...dependencies];
        setIsInitialLoad(false);
        return; // No recargar en la primera carga si hay datos iniciales
      }

      // Si el idioma cambió, recargar
      if (previousLanguage.current !== '' && previousLanguage.current !== actualLocale) {
        console.log('=== useLanguageData: Language changed, reloading data ===');
        console.log('Previous language:', previousLanguage.current);
        console.log('New language:', actualLocale);
      }

      // Si es forzado por forceRefresh, recargar
      if (forceRefresh > 0) {
        console.log('=== useLanguageData: Force refresh triggered ===');
      }

      try {
        setLoading(true);
        setError(null);
        
        console.log('=== useLanguageData: Loading data for language:', actualLocale);
        console.log('=== useLanguageData: Current URL:', pathname);
        console.log('=== useLanguageData: Dependencies:', dependencies);
        
        const result = await fetchFunction(actualLocale);
        setData(result);
        
        console.log('=== useLanguageData: Data loaded successfully for language:', actualLocale);
        console.log('=== useLanguageData: Result:', result);
        
        previousLanguage.current = actualLocale;
        previousDependencies.current = [...dependencies];
        setIsInitialLoad(false);
        
      } catch (err) {
        console.error('=== useLanguageData: Error loading data:', err);
        setError(err instanceof Error ? err.message : 'Error loading data');
        // Mantener los datos actuales en caso de error
      } finally {
        setLoading(false);
      }
    };

    // Verificar si las dependencias cambiaron
    const dependenciesChanged = dependencies.length !== previousDependencies.current.length ||
      dependencies.some((dep, index) => dep !== previousDependencies.current[index]);

    // Solo cargar si:
    // 1. El idioma cambió
    // 2. Es un force refresh
    // 3. Las dependencias cambiaron
    // 4. Es la primera carga pero no hay datos iniciales válidos
    
    const shouldLoad = 
      previousLanguage.current !== currentLanguage || 
      forceRefresh > 0 || 
      dependenciesChanged ||
      (isInitialLoad && (!initialData || 
        (Array.isArray(initialData) && initialData.length === 0) ||
        (typeof initialData === 'object' && initialData !== null && Object.keys(initialData).length === 0)));

    if (shouldLoad) {
      loadData();
    } else if (isInitialLoad) {
      // Marcar como cargado inicialmente sin recargar
      console.log('=== useLanguageData: Using initial data without reload ===');
      previousLanguage.current = currentLanguage;
      previousDependencies.current = [...dependencies];
      setIsInitialLoad(false);
    }
    
  }, [currentLanguage, pathname, forceRefresh, ...dependencies]);

  const refetch = () => {
    if (!loading) {
      setForceRefresh(prev => prev + 1);
    }
  };

  return { data, loading, error, refetch };
} 