/* eslint-disable react/no-array-index-key */
/* eslint-disable @next/next/no-async-client-component */

'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import ContactCard from '@/components/ContactCard';
import { Contact, Note } from '@prisma/client';

const ListPage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.email || '';

  const contacts: Contact[] = await prisma.contact.findMany({
    where: { owner: currentUser },
  });

  const notes: Note[] = await prisma.note.findMany({
    where: { owner: currentUser },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts</h1>
          </Col>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact, index) => (
            <Col key={`Contact-${index}`}>
              <ContactCard
                contact={contact}
                notes={notes.filter((note) => note.contactId === contact.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
