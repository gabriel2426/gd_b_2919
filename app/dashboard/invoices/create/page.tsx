import { Metadata } from 'next';
import { fetchCustomers } from '@/app/lib/data';
import Form from '@/app/ui/invoices/create-form';

export const metadata: Metadata = {
  title: 'Create Invoice',
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Form customers={customers} />
    </main>
  );
}
