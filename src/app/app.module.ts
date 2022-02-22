import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
