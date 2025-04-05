/* eslint-disable no-restricted-globals */
/* eslint-disable import/prefer-default-export */
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  { params }: { params: { id: string } },
) {
  const id = parseInt(params.id, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const contact = await prisma.contact.findUnique({ where: { id } });

  if (!contact) {
    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  }

  return NextResponse.json(contact);
}
