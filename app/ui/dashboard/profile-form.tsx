'use client';

import { useActionState } from 'react';
import { User } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { updateProfile, deleteProfile, ProfileState } from '@/app/lib/actions';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function ProfileForm({ user }: { user: User }) {
  const initialState: ProfileState = { message: null, errors: {} };
  const updateProfileWithId = updateProfile.bind(null, user.id);
  const [state, formAction] = useActionState(updateProfileWithId, initialState);

  return (
    <div className="space-y-6">
      <form action={formAction}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={user.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email}
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="email-error"
            />
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              New Password (leave blank to keep current)
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter new password"
              minLength={6}
              className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>

          {state.message && (
            <div aria-live="polite" aria-atomic="true">
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>

      <div className="rounded-md bg-red-50 p-4 md:p-6">
        <h2 className="mb-2 text-sm font-medium text-red-800">Danger Zone</h2>
        <p className="mb-4 text-sm text-red-600">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <form action={deleteProfile.bind(null, user.id)}>
          <button className="flex h-10 items-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            <TrashIcon className="mr-2 h-5 w-5" />
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
}
