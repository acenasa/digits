/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */

'use client';

import { Card, Image } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';

type ContactCardProps = {
  contact: Contact;
};

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const { firstName, lastName, address, image, description } = contact;

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
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
