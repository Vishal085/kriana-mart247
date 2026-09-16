import { redirect } from 'next/navigation';

export default async function LegacyCustomerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const params = await searchParams;
  const target = params?.redirect
    ? `/login?redirect=${encodeURIComponent(params.redirect)}`
    : '/login';
  redirect(target);
}
