import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReposService } from 'src/app/services/repos.service';
declare let alertify: any; 

@Component({
  selector: 'app-doctormain',
  templateUrl: './doctormain.component.html',
  styleUrls: ['./doctormain.component.css']
})
export class DoctormainComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ReposService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(p => {
      this.myId = +p.id;
      this.getMyPatients();
      this.getMyInfo();
      })
  }
  submitted=false;
  user: any = {};

  myId!: number;
  patientsList: any;
  newPatientForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    doctorId: new  FormControl(0, Validators.required),
  });


  ngOnInit(): void {
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  getMyInfo(){
this.service.getById("api/User",this.myId).subscribe(resp =>{
  this.user = resp;
    })
  }

  getMyPatients() {
    this.service.getById("api/Patients", this.myId).subscribe(resp => {
      this.patientsList = resp;
    })
  }

  addPatient() {
    this.submitted=true;
    this.newPatientForm.controls.doctorId.setValue(this.myId);
    if (this.newPatientForm.valid) {
      const formData = new FormData();
      formData.append("userName", this.newPatientForm.controls.userName.value);
      formData.append("fullName", this.newPatientForm.controls.fullName.value);
      formData.append("doctorId", this.newPatientForm.controls.doctorId.value);
      this.service.post("api/Patients/NewPatient", formData).subscribe(resp => {
        this.getMyPatients();
        alertify.success("Kayıt Başarılı!");
        this.clearForm();
        this.submitted=false;
            }, error=>{alertify.error("Hata");}
      );
    }
  }

  clearForm() {
    this.newPatientForm.reset();
    this.newPatientForm = new FormGroup({
      doctorId: new FormControl(0, Validators.required),
      userName: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
    });
  }

  giveExercise(patientId:number){
    this.router.navigate(['/giveexercise/', patientId, this.myId]);;
  }

}
