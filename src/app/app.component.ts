import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actions:Array<any> =[
    {title:"Home", route:"/home", icon:"house"},
    {title:"Products", route:"/products", icon:"arrow-down-up"},
    {title:"New Product", route:"/newProduct", icon:"plus-circle"},
  ];

  // Maintenant , on veut savoir l'action current.

  currentAction:any;
  setCurrentAction(action:any){
    this.currentAction = action;
  }

}
