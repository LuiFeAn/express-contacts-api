import router from "../authentication/authentication.routes";
import { authorizationMiddleware } from "../../@shared/middlewares/authorization.middleware";
import { contactController } from "./contact.controller";
import { RegisterContactSchema } from "./requests/register-contact.dto";
import { zodRequestValidationMiddleware, ValidationType  } from "../../@shared/middlewares/validation.middleware";
import { DetailContactSchema } from "./requests/detail-contact.dto";

router.post(
  "/users/contacts",
  authorizationMiddleware,
  zodRequestValidationMiddleware(RegisterContactSchema),
  contactController.create.bind(contactController)
);

router.get(
  "/users/contacts/:id",
  authorizationMiddleware,
  zodRequestValidationMiddleware(DetailContactSchema, ValidationType.PARAMS),
  contactController.detail.bind(contactController)
);

router.delete(
  "/users/contacts/:id",
  authorizationMiddleware,
  zodRequestValidationMiddleware(DetailContactSchema, ValidationType.PARAMS),
  contactController.delete.bind(contactController)
);

