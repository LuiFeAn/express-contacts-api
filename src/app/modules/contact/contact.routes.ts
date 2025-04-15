import router from "../authentication/authentication.routes";
import { authorizationMiddleware } from "../../@shared/middlewares/authorization.middleware";
import { contactController } from "./contact.controller";
import { RegisterContactSchema } from "./requests/register-contact.dto";
import { zodRequestValidationMiddleware } from "../../@shared/middlewares/validation.middleware";

router.post(
  "/users/contacts",
  authorizationMiddleware,
  zodRequestValidationMiddleware(RegisterContactSchema),
  contactController.create.bind(contactController)
);

router.get(
  "/users/contacts/:id",
  authorizationMiddleware,
  contactController.detail.bind(contactController)
);
