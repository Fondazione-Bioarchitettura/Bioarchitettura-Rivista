import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const categoryId = searchParams.get('categoryId')

    const where: any = {
      publishedAt: {
        not: null,
      },
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
      include: {
        category: true,
        issue: true,
      },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const article = await prisma.article.create({
      data: {
        title: body.title,
        slug: body.slug,
        content: body.content,
        excerpt: body.excerpt,
        coverImage: body.coverImage,
        author: body.author,
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : null,
        categoryId: body.categoryId,
        issueId: body.issueId,
      },
    })

    return NextResponse.json(article, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}
