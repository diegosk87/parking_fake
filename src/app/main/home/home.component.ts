import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from './services/home.service';
import { Estancia } from './models/estancia';

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


  public estancias:Array<Estancia> = [];
  public loading:boolean = false;

  public data:Array<any> = [];

  constructor(
    private _formBuilder:FormBuilder,
    private _homeService:HomeService
    ) { }

  ngOnInit(): void {
    this.loadEstancias();

    this.form = this._formBuilder.group({
      placa:["",Validators.required]
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

  private loadEstancias(): void {
    this._homeService.getEstancias().subscribe({
      next:(result: Array<Estancia>)=>{
        this.estancias = result;
        console.log(result);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  public onSubmit():void {
    this.submitted = true;
    if(this.form.invalid) return;

    this.loading = true;

    this._homeService.postEstancia({
      placa: this.form.controls.placa.value,
      hora_entrada: null,
      hora_salida: null,
      eliminado: null
    }).subscribe({
      next: (result:Estancia) => {
        console.log(result);
        this.loadEstancias();
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  get f():any{
    return this.form.controls;
  }

}
