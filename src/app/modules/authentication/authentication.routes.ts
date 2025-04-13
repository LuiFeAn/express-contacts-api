import { zodRequestValidationMiddleware } from "../../@shared/middlewares/validation.middleware";
import router from "../../router";
import { authenticationController } from "./authentication.controller";
import { AuthenticationSchema } from "./requests/authentication.dto";

router.post(
  "/auth/login",
  zodRequestValidationMiddleware(AuthenticationSchema),
  authenticationController.login.bind(authenticationController)
);

export default router;
