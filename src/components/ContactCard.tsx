'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import { Contact } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const ContactCard = ({ contact }: { contact: Contact }) => {
  const { id, firstName, lastName, address, image, description } = contact;

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center">
        <Image src={image} alt={`${firstName} ${lastName}`} width={75} height={75} />
        <div className="ms-3">
          <Card.Title className="mb-0">{`${firstName} ${lastName}`}</Card.Title>
          <Card.Subtitle>{address}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link href={`/edit/${id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
};

export default ContactCard;
