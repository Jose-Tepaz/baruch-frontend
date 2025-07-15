'use client'
import { useState } from 'react'
import { query } from '@/services/strapi'

export default function StrapiApiTest() {
    const [testResults, setTestResults] = useState<any>({})
    const [loading, setLoading] = useState(false)

    const testLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt']

    const testPropertiesAPI = async () => {
        setLoading(true)
        const results: any = {}

        for (const lang of testLanguages) {
            try {
                console.log(`=== Testing properties API for language: ${lang} ===`)
                const queryString = `properties?populate=main_image&populate=property_status&populate=category&pagination[limit]=5&locale=${lang}`
                const response = await query(queryString)
                
                results[lang] = {
                    success: true,
                    count: response?.data?.length || 0,
                    firstProperty: response?.data?.[0] || null,
                    meta: response?.meta || null
                }
                
                console.log(`=== ${lang} Results ===`)
                console.log('Count:', results[lang].count)
                console.log('First property title:', results[lang].firstProperty?.title)
                console.log('First property description:', results[lang].firstProperty?.description)
                
            } catch (error) {
                console.error(`=== Error testing ${lang} ===`, error)
                results[lang] = {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                }
            }
        }

        setTestResults(results)
        setLoading(false)
    }

    const testSingleProperty = async () => {
        setLoading(true)
        const results: any = {}

        // Primero obtener una propiedad para probar
        try {
            const firstResponse = await query('properties?pagination[limit]=1&locale=en')
            const firstProperty = firstResponse?.data?.[0]
            
            if (firstProperty) {
                console.log('=== Testing single property with documentId:', firstProperty.documentId)
                
                for (const lang of testLanguages) {
                    try {
                        const queryString = `properties/${firstProperty.documentId}?populate=main_image&populate=property_status&populate=category&locale=${lang}`
                        const response = await query(queryString)
                        
                        results[lang] = {
                            success: true,
                            property: response?.data || null
                        }
                        
                        console.log(`=== Single Property ${lang} Results ===`)
                        console.log('Title:', results[lang].property?.title)
                        console.log('Description:', results[lang].property?.description)
                        
                    } catch (error) {
                        console.error(`=== Error testing single property ${lang} ===`, error)
                        results[lang] = {
                            success: false,
                            error: error instanceof Error ? error.message : 'Unknown error'
                        }
                    }
                }
            } else {
                console.error('No properties found to test')
            }
        } catch (error) {
            console.error('Error getting first property:', error)
        }

        setTestResults(results)
        setLoading(false)
    }

    const testQuickAPI = async () => {
        setLoading(true)
        const results: any = {}

        try {
            // Probar solo las propiedades para inglés y español
            const testLangs = ['en', 'es']
            
            for (const lang of testLangs) {
                try {
                    console.log(`=== Testing quick API for language: ${lang} ===`)
                    
                    // Probar directamente la query que usa el frontend
                    const queryString = `properties?populate=main_image&populate=property_status&populate=category&pagination[limit]=10&locale=${lang}`
                    console.log('Query string:', queryString)
                    
                    const response = await query(queryString)
                    console.log(`=== ${lang} Raw Response ===`, response)
                    
                    results[lang] = {
                        success: true,
                        rawResponse: response,
                        count: response?.data?.length || 0,
                        meta: response?.meta || null,
                        firstProperty: response?.data?.[0] || null
                    }
                    
                    console.log(`=== ${lang} Quick Results ===`)
                    console.log('Count:', results[lang].count)
                    console.log('First property:', results[lang].firstProperty)
                    
                } catch (error) {
                    console.error(`=== Error testing quick ${lang} ===`, error)
                    results[lang] = {
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    }
                }
            }
            
            console.log('=== Final Quick Results ===', results)
            
        } catch (error) {
            console.error('Error in quick test:', error)
        }

        setTestResults(results)
        setLoading(false)
    }

    const testEnvironment = () => {
        console.log('=== Environment Configuration ===')
        console.log('STRAPI_HOST:', process.env.STRAPI_HOST || 'Not set')
        console.log('STRAPI_TOKEN:', process.env.STRAPI_TOKEN ? 'Set' : 'Not set')
        console.log('NODE_ENV:', process.env.NODE_ENV)
        console.log('Current URL:', window.location.href)
        
        // Verificar si podemos acceder a la API
        const testUrl = `${process.env.STRAPI_HOST || 'http://localhost:1337'}/api/properties?pagination[limit]=1`
        console.log('Test URL:', testUrl)
        
        alert(`
Environment Check:
- STRAPI_HOST: ${process.env.STRAPI_HOST || 'Not set'}
- STRAPI_TOKEN: ${process.env.STRAPI_TOKEN ? 'Set' : 'Not set'}
- NODE_ENV: ${process.env.NODE_ENV}
- Test URL: ${testUrl}

Check console for more details.
        `)
    }

    const testDirectAPI = async () => {
        setLoading(true)
        const results: any = {}

        try {
            // Hacer petición directa sin usar el servicio de Strapi
            const testLangs = ['en', 'es']
            
            for (const lang of testLangs) {
                try {
                    console.log(`=== Testing direct API for language: ${lang} ===`)
                    
                    const baseUrl = process.env.STRAPI_HOST || 'http://localhost:1337'
                    const token = process.env.STRAPI_TOKEN || ''
                    const url = `${baseUrl}/api/properties?populate=main_image&populate=property_status&populate=category&pagination[limit]=5&locale=${lang}`
                    
                    console.log('Direct URL:', url)
                    console.log('Token present:', !!token)
                    
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    
                    console.log('Direct response status:', response.status)
                    console.log('Direct response ok:', response.ok)
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                    }
                    
                    const data = await response.json()
                    console.log(`=== ${lang} Direct Response ===`, data)
                    
                    results[lang] = {
                        success: true,
                        directResponse: data,
                        count: data?.data?.length || 0,
                        meta: data?.meta || null,
                        firstProperty: data?.data?.[0] || null,
                        httpStatus: response.status
                    }
                    
                } catch (error) {
                    console.error(`=== Error testing direct ${lang} ===`, error)
                    results[lang] = {
                        success: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    }
                }
            }
            
            console.log('=== Final Direct Results ===', results)
            
        } catch (error) {
            console.error('Error in direct test:', error)
        }

        setTestResults(results)
        setLoading(false)
    }

    return (
        <div className="p-4 bg-info text-white rounded m-3">
            <h3>🔬 Strapi API Test</h3>
            
            <div className="mb-3">
                <button 
                    className="btn btn-warning btn-sm me-2"
                    onClick={testEnvironment}
                >
                    🌍 Check Environment
                </button>
                <button 
                    className="btn btn-success btn-sm me-2"
                    onClick={testDirectAPI}
                    disabled={loading}
                >
                    {loading ? 'Testing...' : '🔗 Direct API Test'}
                </button>
                <button 
                    className="btn btn-light btn-sm me-2"
                    onClick={testQuickAPI}
                    disabled={loading}
                >
                    {loading ? 'Testing...' : '⚡ Quick Test (EN/ES)'}
                </button>
                <button 
                    className="btn btn-light btn-sm me-2"
                    onClick={testPropertiesAPI}
                    disabled={loading}
                >
                    {loading ? 'Testing...' : '🔍 Test Properties API'}
                </button>
                <button 
                    className="btn btn-light btn-sm me-2"
                    onClick={testSingleProperty}
                    disabled={loading}
                >
                    {loading ? 'Testing...' : '🏠 Test Single Property'}
                </button>
            </div>

            {Object.keys(testResults).length > 0 && (
                <div className="row">
                    {Object.keys(testResults).map(lang => (
                        <div key={lang} className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-header">
                                    <strong>{lang.toUpperCase()}</strong>
                                </div>
                                <div className="card-body">
                                    {testResults[lang] ? (
                                        testResults[lang].success ? (
                                            <div>
                                                <small className="text-success">✅ Success</small>
                                                <div className="mt-2">
                                                    <strong>Count:</strong> {testResults[lang].count || 'N/A'}
                                                </div>
                                                <div className="mt-2">
                                                    <strong>HTTP Status:</strong> {testResults[lang].httpStatus || 'N/A'}
                                                </div>
                                                <div className="mt-2">
                                                    <strong>Meta:</strong> {testResults[lang].meta ? JSON.stringify(testResults[lang].meta.pagination) : 'N/A'}
                                                </div>
                                                {testResults[lang].firstProperty && (
                                                    <div className="mt-2">
                                                        <strong>First Property:</strong>
                                                        <div className="small">
                                                            <strong>ID:</strong> {testResults[lang].firstProperty.id || 'No ID'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>DocumentID:</strong> {testResults[lang].firstProperty.documentId || 'No documentId'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>Title:</strong> {testResults[lang].firstProperty.title || 'No title'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>Description:</strong> {testResults[lang].firstProperty.description ? testResults[lang].firstProperty.description.substring(0, 100) + '...' : 'No description'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>Locale:</strong> {testResults[lang].firstProperty.locale || 'No locale'}
                                                        </div>
                                                    </div>
                                                )}
                                                {testResults[lang].property && (
                                                    <div className="mt-2">
                                                        <strong>Property:</strong>
                                                        <div className="small">
                                                            <strong>Title:</strong> {testResults[lang].property.title || 'No title'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>Description:</strong> {testResults[lang].property.description ? testResults[lang].property.description.substring(0, 100) + '...' : 'No description'}
                                                        </div>
                                                        <div className="small">
                                                            <strong>Locale:</strong> {testResults[lang].property.locale || 'No locale'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <small className="text-danger">❌ Error</small>
                                                <div className="small text-danger mt-2">
                                                    {testResults[lang].error}
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        <small className="text-muted">No data</small>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 