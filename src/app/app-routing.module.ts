import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctormainComponent } from './pages/doctor-pages/doctormain/doctormain.component';
import { GiveExerciseComponent } from './pages/doctor-pages/give-exercise/give-exercise.component';
import { PatientDetailsComponent } from './pages/doctor-pages/patient-details/patient-details.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'giveexercise/:id/:docid', component: GiveExerciseComponent },
  { path: 'doctormain/:id', component: DoctormainComponent },
  { path: 'patientdetails/:id/:docid', component: PatientDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
