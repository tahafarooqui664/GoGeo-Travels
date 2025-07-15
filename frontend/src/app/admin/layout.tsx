import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal - GoGeo Travels London',
  description: 'Admin portal for managing bookings and fleet',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
