'use client';

import { useEffect, useState } from 'react';
import { getProperties } from '@/services/properties';

export default function PropertiesDebug() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        console.log('=== PropertiesDebug: Loading properties ===');
        setLoading(true);
        const data = await getProperties({});
        console.log('=== PropertiesDebug: Properties loaded ===', data);
        setProperties(data || []);
      } catch (err) {
        console.error('=== PropertiesDebug: Error loading properties ===', err);
        setError(err instanceof Error ? err.message : 'Error unknown');
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h2>Properties Debug - Loading...</h2>
        <div className="alert alert-info">Cargando propiedades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2>Properties Debug - Error</h2>
        <div className="alert alert-danger">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2>Properties Debug</h2>
      <div className="alert alert-success">
        Propiedades cargadas: {properties.length}
      </div>
      
      <div className="mt-4">
        <h3>Debug Info:</h3>
        <ul>
          <li>Properties length: {properties.length}</li>
          <li>Properties type: {typeof properties}</li>
          <li>Is array: {Array.isArray(properties) ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3>Properties Data:</h3>
        <pre className="bg-light p-3" style={{ maxHeight: '400px', overflow: 'auto' }}>
          {JSON.stringify(properties, null, 2)}
        </pre>
      </div>

      <div className="mt-4">
        <h3>Properties List:</h3>
        {properties.length === 0 ? (
          <div className="alert alert-warning">No properties found</div>
        ) : (
          <div className="row">
            {properties.map((property, index) => (
              <div key={property.id || index} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{property.title || 'No title'}</h5>
                    <p className="card-text">
                      <strong>ID:</strong> {property.id}<br />
                      <strong>DocumentId:</strong> {property.documentId}<br />
                      <strong>Price:</strong> ${property.price}<br />
                      <strong>Address:</strong> {property.address}<br />
                      <strong>Status:</strong> {property.propertyStatus}<br />
                      <strong>Image:</strong> {property.image ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 