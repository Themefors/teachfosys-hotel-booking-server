import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { ContactController } from '../controllers/contact.controller';
import { ContactValidation } from '../validations/contact.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(ContactValidation.createContactZodSchema),
  ContactController.createContact
);

router.get('/', ContactController.getContacts);

router.get('/:id', ContactController.getContact);

router.patch(
  '/:id',
  validateRequest(ContactValidation.updateContactZodSchema),
  ContactController.updateContact
);

router.delete('/:id', ContactController.deleteContact);

export const ContactRoutes = router;
