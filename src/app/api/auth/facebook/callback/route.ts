
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    // Handle error - user denied access or other issue
    return redirect('/connect?error=access_denied');
  }

  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const clientSecret = process.env.FACEBOOK_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUri}&client_secret=${clientSecret}&code=${code}`);
    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        console.error('Facebook OAuth Error:', tokenData.error);
        return redirect(`/connect?error=${tokenData.error.message}`);
    }

    const accessToken = tokenData.access_token;

    // TODO: Save the access token and refresh token to the database for the user.
    // For now, we will just redirect to the dashboard.
    
    // Using cookies to pass the token for this example. 
    // In a real app, you should handle this more securely.
    const response = NextResponse.redirect(new URL('/dashboard', req.url));
    response.cookies.set('fb_access_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: tokenData.expires_in,
    });

    return response;

  } catch (error) {
    console.error('Callback Error:', error);
    return redirect('/connect?error=callback_failed');
  }
}
