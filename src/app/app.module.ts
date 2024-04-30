import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet } from "@angular/router";
import { OAuthModule } from "angular-oauth2-oidc";
import { AuthenticationComponent } from "../views/authentication/authentication.component";
import { BannerComponent } from "../views/banner/banner.component";
import { HomeComponent } from "../views/home/home.component";
import { LoginComponent } from "../views/login/login.component";
import { OrganizationContainer } from "../views/organizations/organization-container/organization.container";
import { OrganizationDeleteComponent } from "../views/organizations/organization-delete/organization-delete.component";
import { OrganizationDetailsComponent } from "../views/organizations/organization-details/organization-details.component";
import { OrganizationListComponent } from "../views/organizations/organization-list/organization-list.component";
import { OrganizationAddComponent } from "../views/organizations/organization-write/organization-add.component";
import { OrganizationEditComponent } from "../views/organizations/organization-write/organization-edit.component";
import { AppComponent } from "./app.component";
import { routes } from "./app.routes";

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        HttpClientModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule,
        RouterOutlet,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        AuthenticationComponent,
        BannerComponent,
        HomeComponent,
        LoginComponent,
        OrganizationAddComponent,
        OrganizationContainer,
        OrganizationDeleteComponent,
        OrganizationDetailsComponent,
        OrganizationEditComponent,
        OrganizationListComponent,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }