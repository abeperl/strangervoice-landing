import { NextRequest, NextResponse } from 'next/server'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const email = (body?.email ?? '').trim().toLowerCase()

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL
    if (!webhookUrl) {
      console.error('[waitlist] WAITLIST_WEBHOOK_URL is not set')
      return NextResponse.json(
        { error: 'Waitlist service not configured' },
        { status: 500 }
      )
    }

    // Google Apps Script requires GET with query params (POST body is dropped on redirect)
    const source = (body?.source ?? 'landing_page') as string
    const timestamp = new Date().toISOString()
    const url = new URL(webhookUrl)
    url.searchParams.set('email', email)
    url.searchParams.set('source', source)
    url.searchParams.set('timestamp', timestamp)

    const webhookRes = await fetch(url.toString(), {
      method: 'GET',
      redirect: 'follow',
    })

    const text = await webhookRes.text()
    let result: Record<string, unknown> = {}
    try { result = JSON.parse(text) } catch {}

    // 200 with JSON means success; 302 redirect is also normal for Apps Script
    if (!webhookRes.ok && webhookRes.status !== 302) {
      console.error('[waitlist] webhook responded with', webhookRes.status, text)
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, result }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
