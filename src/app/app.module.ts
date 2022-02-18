import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { SingleSensorComponent } from './single-sensor/single-sensor.component';
import { CampusComponent } from './campus/campus.component';
import { AddCo2SensorComponent } from './add-co2-sensor/add-co2-sensor.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SingleSensorComponent,
    CampusComponent,
    AddCo2SensorComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
