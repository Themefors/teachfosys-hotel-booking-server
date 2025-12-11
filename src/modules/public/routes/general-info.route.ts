import express from 'express';
import validateRequest from '../../../app/middlewares/validateRequest';
import { GeneralInfoController } from '../controllers/general-info.controller';
import { GeneralInfoValidation } from '../validations/general-info.validation';

const router = express.Router();

router.get('/', GeneralInfoController.getGeneralInfo);

router.post(
  '/create',
  validateRequest(GeneralInfoValidation.createGeneralInfoZodSchema),
  GeneralInfoController.createGeneralInfo
);

router.patch(
  '/update',
  validateRequest(GeneralInfoValidation.updateGeneralInfoZodSchema),
  GeneralInfoController.updateGeneralInfo
);

export const GeneralInfoRoutes = router;
