import { Component, OnInit } from '@angular/core';
import { BikeService } from 'src/app/services/bike.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  models: String[]=[
    'Yamaha YZF R15 V3',
    'TVS Apache RTR 160',
    'Royal Enfield Classic 350',
    'Bajaj Pulsar 150',
    'KTM 200 Duke',
    'TVS Apache RTR 160 4V',
    'KTM 125 Duke',
    'Bajaj Pulsar NS200'
  
  ]
  bikeForm: FormGroup;
  validMessage :String ="";

  constructor(private bikeService:BikeService) { }

  ngOnInit() {
    this.bikeForm=new FormGroup({
      name: new FormControl('', Validators.required), 
      email : new FormControl('', Validators.required),  
      phone: new FormControl('', Validators.required), 
      model: new FormControl('', Validators.required), 
      serialNumber: new FormControl('', Validators.required),
      purchasePrice: new FormControl('', Validators.required), 
      purchaseDate: new FormControl('', Validators.required),
      contact: new FormControl()

    }); 
  }

  submitRegistration(){
   

    if(this.bikeForm.valid){
      console.log("here")
     
      this.bikeService.createBikeRegistration(this.bikeForm.value).subscribe(
        data=>{
          this.validMessage="Your Bike Registration has been submitted. Thank you!";
          this.bikeForm.reset();
          return true;
        },
        error=>{
          return Observable.throw(error);
        }
      )
    }
    else{
      this.validMessage="Please fill out the form before submitting!";
    }
  }

}
