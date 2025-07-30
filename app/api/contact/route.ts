import { NextRequest, NextResponse } from 'next/server';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('API Route recibió datos:', body);
    
    // Verificar variables de entorno
    if (!STRAPI_HOST || !STRAPI_TOKEN) {
      console.error('Variables de entorno faltantes:', { STRAPI_HOST: !!STRAPI_HOST, STRAPI_TOKEN: !!STRAPI_TOKEN });
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      );
    }

    console.log('Enviando a Strapi:', `${STRAPI_HOST}/api/contacts`);
    
    const response = await fetch(`${STRAPI_HOST}/api/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: body })
    });

    console.log('Respuesta de Strapi:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Error del servidor: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('Respuesta exitosa de Strapi:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor', details: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 