import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "../list/list.component";
import { AddComponent } from "../add/add.component";
import { ModifyComponent } from "../modify/modify.component";
import { DeleteComponent } from "../delete/delete.component";

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "add", component: AddComponent },
  { path: "modify", component: ModifyComponent },
  { path: "delete", component: DeleteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
