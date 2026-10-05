import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard.js";
import { RolesGuard } from "../guards/roles.guard.js";
import { Roles } from "./roles.decorator.js";
import { ROLES } from "../constants/roles.constants.js";


export const Auth = (...roles: ROLES[]) => {
    roles.push(ROLES.ADMIN)
    return applyDecorators(
    Roles(roles),
    UseGuards(AuthGuard, RolesGuard)
    )
}