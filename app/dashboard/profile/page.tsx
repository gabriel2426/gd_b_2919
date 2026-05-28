import { Metadata } from 'next';
import { auth } from '@/auth';
import { fetchUserById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import ProfileForm from '@/app/ui/dashboard/profile-form';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    notFound();
  }

  const user = await fetchUserById(session.user.id as string);
  if (!user) {
    notFound();
  }

  return (
    <main>
      <h1 className="mb-8 text-xl md:text-2xl">Profile</h1>
      <ProfileForm user={user} />
    </main>
  );
}
