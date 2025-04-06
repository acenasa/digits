/* eslint-disable react/prop-types */

'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';

type AddNoteProps = {
  contactId: number;
};

type NoteFormInput = {
  note: string;
  contactId: number;
  owner: string;
};

const AddNoteForm: React.FC<AddNoteProps> = ({ contactId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormInput>({
    resolver: yupResolver(AddNoteSchema),
  });

  const onSubmit = async (data: NoteFormInput) => {
    await addNote(data);
    reset();
    swal('Success', 'Note added', 'success', { timer: 2000 });
  };

  return (
    <Card className="mt-3">
      <Card.Header className="py-2 text-center">
        <strong>Add Timestamped Note</strong>
      </Card.Header>
      <Card.Body className="pt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label visuallyHidden htmlFor="note">Note</Form.Label>
            <input
              id="note"
              type="text"
              placeholder="Enter note"
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>

          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('contactId')} value={contactId} />

          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="primary" className="w-100">
                Submit
              </Button>
            </Col>
            <Col>
              <Button
                type="button"
                onClick={() => reset()}
                variant="warning"
                className="w-100"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
