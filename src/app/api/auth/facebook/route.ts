
import { redirect } from 'next/navigation';

export async function GET() {
  const clientId = process.env.FACEBOOK_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;
  const scope = 'ads_management,ads_read,business_management,pages_show_list,pages_read_engagement';

  const authUrl = new URL('https://www.facebook.com/v19.0/dialog/oauth');
  authUrl.searchParams.set('client_id', clientId || '');
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', JSON.stringify({source: 'adman-pro'}));
  authUrl.searchParams.set('scope', scope);
  authUrl.searchParams.set('response_type', 'code');
  
  redirect(authUrl.toString());
}
