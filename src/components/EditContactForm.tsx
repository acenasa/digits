'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useRouter } from 'next/navigation';
import { EditContactSchema } from '@/lib/validationSchemas';
import LoadingSpinner from './LoadingSpinner';
import { editContact } from '@/lib/dbActions';

const EditContactForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams() as { id: string };
  const [contact, setContact] = useState<any | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EditContactSchema),
  });

  useEffect(() => {
    const fetchContact = async () => {
      const res = await fetch(`/api/contacts/${id}`);
      const contactData = await res.json();
      if (contactData) {
        setContact(contactData);
        (Object.entries(contactData) as [keyof EditContactProps, any][]).forEach(([field, value]) => {
          setValue(field, value);
        });
      }
    };
    fetchContact();
  }, [id, setValue]);

  if (status === 'loading' || !contact) return <LoadingSpinner />;
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const onSubmit = async (data: any) => {
    await editContact({ ...data, id: parseInt(id, 10) });
    swal('Success', 'Your contact has been updated', 'success', { timer: 2000 });
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <input
                        type="text"
                        {...register('address')}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.address?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <input
                        type="text"
                        {...register('image')}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.image?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    rows={3}
                    {...register('description')}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={session?.user?.email ?? ''} />

                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditContactForm;
