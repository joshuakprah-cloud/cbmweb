import { redirect } from 'next/navigation';

// This page exists for backward compatibility with existing links
// The canonical contact form is now located at /contact
export default function ContactFormRedirect() {
  redirect('/contact');
}

export const revalidate = 86400; // 1 day cache
