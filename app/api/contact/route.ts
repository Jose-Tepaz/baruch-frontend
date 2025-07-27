import { NextRequest, NextResponse } from 'next/server';

const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${STRAPI_HOST}/api/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: body })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Strapi API error:', response.status, errorText);
      return NextResponse.json(
        { error: `Error del servidor: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error en API route:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 