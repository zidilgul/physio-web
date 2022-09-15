import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReposService } from 'src/app/services/repos.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ReposService,
    private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.params.subscribe(p => {
      this.currentId = +p.id;
      this.docId = +p.docid;
    })
  }
  ngOnInit(): void {
    this.getDetails();
    this.getPatient();
  }

  docId!:number;
  currentId!: number;
  patientMoveList: any;
  currentPatient: any;
  showTable = false;
  logout() {
    this.router.navigateByUrl('/login');
  }

  getPatient() {
    this.service.getById("api/User", this.currentId).subscribe(resp => {
      this.currentPatient = resp;
      console.log(resp);
    })
  }

  getDetails() {
    this.service.getById("api/PatientsMove", this.currentId).subscribe(resp => {
      this.patientMoveList = resp;
      if (this.patientMoveList.length > 0)
        this.showTable = true;
    })
  }

  giveExercise() {
    this.router.navigate(['/giveexercise/', this.currentId, this.docId]);;
  }

  goToMain() {
    this.router.navigateByUrl('/doctormain/' + this.docId);
  }
}
