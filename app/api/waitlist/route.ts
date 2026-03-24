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

    const webhookRes = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        source: body?.source ?? 'landing_page',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!webhookRes.ok) {
      console.error('[waitlist] webhook responded with', webhookRes.status)
      return NextResponse.json(
        { error: 'Failed to join waitlist. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
