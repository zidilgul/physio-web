import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReposService } from 'src/app/services/repos.service';
declare let alertify: any; 

@Component({
  selector: 'app-give-exercise',
  templateUrl: './give-exercise.component.html',
  styleUrls: ['./give-exercise.component.css']
})
export class GiveExerciseComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ReposService,
    private activatedRoute: ActivatedRoute,) {
    this.activatedRoute.params.subscribe(p => {
      this.currentId = +p.id;
      this.docId = +p.docid;
    })
  }

  docId!:number;
  currentId!: number;
  currentPatient: any;
  bodyPartList: any;
  moveList: any;
  submitted=false;
  selectedMove: any;
  selectedBodyPart:any;
  bodyPartSet = false;
  newExerciseForm = new FormGroup({
    moveId: new FormControl('', Validators.required),
    numberOfRepetitions: new FormControl('', Validators.required),
    numberOfSets: new FormControl('',Validators.required),
    patientId: new FormControl('',Validators.required),
  });

  ngOnInit(): void {
    this.getBodyParts();
    this.getPatient();
  }

  getMyDoc(){
    this.service.getById
  }

  getBodyParts() {
    this.service.getList("api/BodyPart").subscribe(resp => {
      this.bodyPartList = resp;
    })
  }

  getMoves(bodyPartId : number) {
    this.selectedMove = null;
    this.service.getById("api/Move", bodyPartId).subscribe(resp => {
      this.moveList = resp;
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  giveExercise() {
    this.submitted=true;
    this.newExerciseForm.controls.patientId.setValue(this.currentId);
    this.newExerciseForm.controls.moveId.setValue(this.selectedMove.id);
    debugger;
    if (this.newExerciseForm.valid) {
      var newPatientMove = {
        PatientId : this.newExerciseForm.controls.patientId.value,
        MoveId : this.newExerciseForm.controls.moveId.value,
        NumberOfRepetitons : this.newExerciseForm.controls.numberOfRepetitions.value,
        NumberOfSets : this.newExerciseForm.controls.numberOfSets.value
      }
      this.service.post("api/PatientsMove/NewPatientMove", newPatientMove).subscribe(resp => {
        alertify.success("Hareket başarıyla atandı.");
        this.clearForm();
        this.submitted=false;
            }, error=>{alertify.error("Başarısız.");}
      );
    }
  }

  goToMain(){
    this.router.navigateByUrl('/doctormain/'+ this.docId);
  }

  clearForm() {
    this.newExerciseForm.reset();
    this.newExerciseForm = new FormGroup({
      moveId: new FormControl('', Validators.required),
      numberOfRepetitions: new FormControl('', Validators.required),
      numberOfSets: new FormControl('',Validators.required),
      patientId: new FormControl('',Validators.required),
    });
    this.selectedMove =null;
    this.selectedBodyPart=null;
    this.bodyPartSet=false;
  }

  getPatient(){
    this.service.getById("api/User", this.currentId).subscribe(resp => {
      this.currentPatient = resp;
    })
  }

  seeHistory(){
    this.router.navigate(['/patientdetails/', this.currentId, this.docId]);;
  }

  setMoveParam(move: any) {
    this.selectedMove = move;
  }

  setBodyPartParam(bodyPart: any) {
    this.bodyPartSet=true;
    this.selectedBodyPart = bodyPart;
    this.getMoves(this.selectedBodyPart.id);
  }

}
