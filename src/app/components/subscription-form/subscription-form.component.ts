import { Component, OnInit } from '@angular/core';
import { Subscription } from 'src/app/models/subscription';
import { SubscribersService } from 'src/app/services/subscribers.service';

@Component({
  selector: 'app-subscription-form',
  templateUrl: './subscription-form.component.html',
  styleUrls: ['./subscription-form.component.css']
})
export class SubscriptionFormComponent implements OnInit {

  isEmailError:boolean = false;
  isSubscriber: boolean = false;
  constructor(private subService: SubscribersService){}

  ngOnInit(): void {

  }

  onSubmit(formValue:any){
    const subData: Subscription = {
      name: formValue.name,
      email: formValue.email
    }

    this.subService.checkSubscribe(subData.email).then(subsc=>{
      if(subsc.empty){
        this.isSubscriber = true
        this.subService.addSubscriber(subData).then(()=>{
          console.log("Subscrição realizada com sucesso");
        }).catch(()=>console.log("Falha ao realizar subscrição"));
      }else{
       this.isEmailError = true;
      }

    });

    }




}
