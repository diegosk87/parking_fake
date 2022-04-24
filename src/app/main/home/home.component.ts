import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public contentHeader: object
  public form:FormGroup;
  public submitted:boolean = false;
  public selectTiposLoading:boolean = false;


  public estancias:Array<any> = [];
  public loading:boolean = false;

  public data:Array<any> = [];

  constructor(
    private _formBuilder:FormBuilder,
    private _homeService:HomeService
    ) { }

  ngOnInit(): void {

    this._homeService.getEstancias().subscribe({
      next:(data)=>{
        this.estancias = data;
        console.log(data);
      },
      error:err=>{
        console.log(err);
      }
    })

    this.form = this._formBuilder.group({
      placa:["",Validators.required],
      tipo:["", Validators.required]
    });

    this.contentHeader = {
      headerTitle: 'Home',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          }
        ]
      }
    }
  }

  public onSubmit():void {
    

    // this.submitted = true;
    // if(this.form.invalid) return;

    // this.loading = true;
  }

  get f():any{
    return this.form.controls;
  }

}
