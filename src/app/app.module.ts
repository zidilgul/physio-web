import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReposService } from './services/repos.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoctormainComponent } from './pages/doctor-pages/doctormain/doctormain.component';
import { GiveExerciseComponent } from './pages/doctor-pages/give-exercise/give-exercise.component';
import { PatientDetailsComponent } from './pages/doctor-pages/patient-details/patient-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DoctormainComponent,
    GiveExerciseComponent,
    PatientDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ReposService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
