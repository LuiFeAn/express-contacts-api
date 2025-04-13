import router from ".";
import { registerController } from "../modules/register/register.controller";
import { zodRequestValidationMiddleware } from "../@shared/middlewares/validation.middleware";
import { RegisterUserSchema } from "../modules/register/requests/register-user.dto";

router.post(
  "/register",
  zodRequestValidationMiddleware(RegisterUserSchema),
  registerController.register.bind(registerController)
);
