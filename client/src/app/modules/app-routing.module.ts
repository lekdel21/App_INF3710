import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "../list/list.component";
import { AddComponent } from "../add/add.component";
import { ModifyComponent } from "../modify/modify.component";

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "modify", component: ModifyComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
