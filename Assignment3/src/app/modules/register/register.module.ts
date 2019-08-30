import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterFormComponent } from "./register-form/register-form.component";

import { MaterialModule } from "../../material.module";

@NgModule({
  declarations: [RegisterFormComponent],
  imports: [CommonModule, MaterialModule]
})
export class RegisterModule {}
