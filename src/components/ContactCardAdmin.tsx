/* eslint-disable react/prop-types */

'use client';

import { Card, Image, Button } from 'react-bootstrap';
import type { Contact } from '@prisma/client';
import Link from 'next/link';

type ContactCardAdminProps = {
  contact: Contact & { id: number };
};

const ContactCardAdmin: React.FC<ContactCardAdminProps> = ({ contact }) => {
  const { id, firstName, lastName, address, image, description, owner } = contact;
  return (
    <Card className="h-100">
      <Card.Header>
        <div className="d-flex flex-column align-items-start">
          <Image
            src={image}
            width={75}
            height={75}
            alt={`${firstName} ${lastName}`}
            className="mb-2"
          />
          <Card.Title className="mb-0">
            {firstName}
            {lastName}
          </Card.Title>
          <Card.Subtitle className="text-muted">{address}</Card.Subtitle>
        </div>
      </Card.Header>
      <hr className="my-0" />
      <Card.Body>
        <Card.Text>{description}</Card.Text>
        <p className="blockquote-footer">{owner}</p>
        <Link href={`/edit/${id}`} passHref>
          <Button variant="outline-secondary" size="sm">Edit</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ContactCardAdmin;
