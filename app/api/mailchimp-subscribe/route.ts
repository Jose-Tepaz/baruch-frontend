import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { result: 'error', msg: 'Invalid email address' },
        { status: 400 }
      );
    }

    // URL de Mailchimp para suscripción (usando post-json para respuesta JSON)
    const mailchimpUrl = 'https://baruchrealestate.us21.list-manage.com/subscribe/post-json';
    
    // Construir los parámetros
    const params = new URLSearchParams();
    params.append('u', '801951f17b12d427872e2ac56');
    params.append('id', 'ce8812881a');
    params.append('EMAIL', email);
    params.append('b_801951f17b12d427872e2ac56_ce8812881a', '');
    // Agregar callback para JSONP (Mailchimp lo requiere)
    params.append('c', '?');

    // Hacer la petición a Mailchimp
    // Mailchimp devuelve JSONP cuando se usa post-json con callback
    const fullUrl = `${mailchimpUrl}?${params.toString()}`;
    console.log('Mailchimp URL:', fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Accept': '*/*', // Aceptar cualquier tipo de respuesta
        'User-Agent': 'Mozilla/5.0', // Algunos servicios requieren User-Agent
      },
    });

    const responseText = await response.text();
    console.log('Mailchimp raw response:', responseText);
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Intentar parsear como JSON o JSONP
    let data;
    try {
      // Limpiar el texto de respuesta
      let cleanedText = responseText.trim();
      
      // Si la respuesta es JSONP (formato: callback({...}) o callback?({...}))
      // Mailchimp puede devolver: ?({"result":"success","msg":"..."})
      // O: jsonp_callback_12345({"result":"success","msg":"..."})
      
      // Buscar el objeto JSON dentro de paréntesis
      const jsonpMatch = cleanedText.match(/\(({[\s\S]*})\)\s*;?\s*$/);
      if (jsonpMatch && jsonpMatch[1]) {
        try {
          data = JSON.parse(jsonpMatch[1]);
        } catch (e) {
          // Si falla, intentar encontrar JSON de otra forma
          const jsonMatch = cleanedText.match(/{[\s\S]*}/);
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
          } else {
            throw e;
          }
        }
      } else {
        // Intentar parsear como JSON directo
        data = JSON.parse(cleanedText);
      }
    } catch (parseError) {
      console.error('Parse error:', parseError);
      console.error('Response text that failed to parse:', responseText);
      
      // Si la respuesta contiene HTML, puede ser una página de error de Mailchimp
      if (responseText.includes('<html') || responseText.includes('<!DOCTYPE')) {
        return NextResponse.json(
          { 
            result: 'error',
            msg: 'Mailchimp returned an error page. Please check your configuration.'
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { 
          result: 'error',
          msg: 'Unable to process subscription. Please try again.'
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Mailchimp subscription error:', error);
    return NextResponse.json(
      { 
        result: 'error',
        msg: 'An error occurred. Please try again later.'
      },
      { status: 500 }
    );
  }
}

