import { NextResponse } from 'next/server';
import { getCategories } from '@/services/categories';

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (error) {
        // Error silencioso en producción - devolver array vacío
        return NextResponse.json([], { status: 500 });
    }
}
