import router from "../../router";
import { registerController } from "./register.controller";
import { zodRequestValidationMiddleware } from "../../@shared/middlewares/validation.middleware";
import { RegisterUserSchema } from "./requests/register-user.dto";

router.post(
  "/register",
  zodRequestValidationMiddleware(RegisterUserSchema),
  registerController.register.bind(registerController)
);
