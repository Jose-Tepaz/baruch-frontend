#!/usr/bin/env node

// Script para verificar la configuración de Strapi
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🔍 Checking Strapi Configuration...\n');

// 1. Verificar variables de entorno
console.log('1. Environment Variables:');
const strapiHost = process.env.STRAPI_HOST;
const strapiToken = process.env.STRAPI_TOKEN;

console.log(`   STRAPI_HOST: ${strapiHost ? '✅ Set' : '❌ Missing'}`);
console.log(`   STRAPI_TOKEN: ${strapiToken ? '✅ Set' : '❌ Missing'}`);

if (!strapiHost || !strapiToken) {
    console.log('\n❌ Missing environment variables!');
    console.log('\nCreate a .env.local file with:');
    console.log('STRAPI_HOST=http://localhost:1337');
    console.log('STRAPI_TOKEN=your_strapi_api_token_here\n');
    process.exit(1);
}

// 2. Verificar archivo .env.local
console.log('\n2. Environment File:');
const envFile = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envFile)) {
    console.log('   .env.local: ✅ Found');
} else {
    console.log('   .env.local: ❌ Not found');
}

// 3. Verificar conexión a Strapi
console.log('\n3. Testing Strapi Connection:');
const testUrl = `${strapiHost}/api/categories?fields[0]=name&fields[1]=slug`;

fetch(testUrl, {
        headers: {
            'Authorization': `Bearer ${strapiToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(`   Status: ${response.status} ${response.statusText}`);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
    })
    .then(data => {
        console.log(`   Categories found: ✅ ${data.data?.length || 0} items`);
        console.log('\n✅ Strapi connection successful!');
    })
    .catch(error => {
        console.log(`   Connection: ❌ Failed`);
        console.log(`   Error: ${error.message}`);
        console.log('\n❌ Strapi connection failed!');
        console.log('\nCheck:');
        console.log('1. Is Strapi server running?');
        console.log('2. Are the environment variables correct?');
        console.log('3. Is the API token valid?');
        process.exit(1);
    });