import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import ContactCard from '@/components/ContactCard';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { Contact, Note } from '@prisma/client';

const ListContacts = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    redirect('/auth/signin');
  }

  const contacts: Contact[] = await prisma.contact.findMany({
    where: { owner: session.user.email },
    orderBy: { lastName: 'asc' },
  });

  const notes: Note[] = await prisma.note.findMany({
    where: { owner: session.user.email },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="container py-3">
      <h2 className="text-center">List Contacts</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {contacts.map((contact, index) => (
          <div key={index} className="col">
            {session.user.email === 'admin@foo.com' ? (
              <ContactCardAdmin
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            ) : (
              <ContactCard
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListContacts;
