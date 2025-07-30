const { STRAPI_HOST, STRAPI_TOKEN } = process.env;

export async function postContact(data: {
  interested_in: string,
  client_name: string,
  email_address: string,
  phone: string,
  message: string
}) {
  const response = await fetch(`${STRAPI_HOST}/api/contacts`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}