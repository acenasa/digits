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
      <Card.Header className="d-flex align-items-center gap-3">
        <Image
          src={image}
          roundedCircle
          width={75}
          height={75}
          alt={`${firstName} ${lastName}`}
        />
        <div>
          <Card.Title className="mb-0">
            {firstName}
            {lastName}
          </Card.Title>
          <Card.Subtitle className="text-muted">{address}</Card.Subtitle>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
