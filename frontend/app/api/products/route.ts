import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const featured = searchParams.get('featured')
    const limit = searchParams.get('limit')

    const where: any = {
      inStock: true,
    }

    if (type) {
      where.type = type
    }

    if (featured === 'true') {
      where.featured = true
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
      include: {
        category: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const product = await prisma.product.create({
      data: {
        title: body.title,
        slug: body.slug,
        description: body.description,
        price: body.price,
        type: body.type,
        coverImage: body.coverImage,
        featured: body.featured || false,
        inStock: body.inStock !== undefined ? body.inStock : true,
        categoryId: body.categoryId,
      },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}
