import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterFormComponent } from "./register-form/register-form.component";

import { MaterialModule } from "../../material.module";

import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [CommonModule, MaterialModule, MatPasswordStrengthModule]
})
export class RegisterModule {}
