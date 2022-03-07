import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';
import { CampusComponent } from './campus/campus.component';
import { AddCo2SensorComponent } from './add-co2-sensor/add-co2-sensor.component';
import { FooterComponent } from './footer/footer.component';
import { EditCo2SensorComponent } from './edit-co2-sensor/edit-co2-sensor.component';
import { DeleteCo2SensorComponent } from './delete-co2-sensor/delete-co2-sensor.component';
import { AddCampusComponent } from './add-campus/add-campus.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { EditCampusComponent } from './edit-campus/edit-campus.component';
import { DeleteCampusComponent } from './delete-campus/delete-campus.component';
import { EventEmitterService } from './event-emitter.service';
import { CookieService  } from 'ngx-cookie-service';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { DeleteLokaalComponent } from './delete-lokaal/delete-lokaal.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { ChangeThresholdsComponent } from './change-thresholds/change-thresholds.component';
import { AddUserFromCampusComponent } from './add-user-from-campus/add-user-from-campus.component';
import { VentilationControlComponent } from './ventilation-control/ventilation-control.component';
import { authInterceptorProviders } from './service/auth.interceptor.service';
import { AuthGuard } from './_guards/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SingleSensorComponent,
    CampusComponent,
    AddCo2SensorComponent,
    FooterComponent,
    EditCo2SensorComponent,
    DeleteCo2SensorComponent,
    AddCampusComponent,
    UsersDashboardComponent,
    AddUserComponent,
    LoginComponent,
    EditCampusComponent,
    DeleteCampusComponent,
    PageNotFoundComponent,
    DeleteLokaalComponent,
    DeleteUserComponent,
    ChangeThresholdsComponent,
    AddUserFromCampusComponent,
    VentilationControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    EventEmitterService,
    CookieService,
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }