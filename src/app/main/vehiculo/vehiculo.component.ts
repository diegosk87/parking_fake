import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {
  public contentHeader: object
  public form:FormGroup;
  public submitted:boolean = false;
  public selectTiposLoading:boolean = false;
  public selectTipos:Array<any> = [
    {
      name: 'Privado',
      id: 1
    }
  ];
  public loading:boolean = false;

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.form = this._formBuilder.group({
      placa:["",Validators.required],
      tipo:["", Validators.required]
    });

    this.contentHeader = {
      headerTitle: 'Vehiculos',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Index'
          }
        ]
      }
    }
  }

  public onSubmit():void {
    this.submitted = true;
    if(this.form.invalid) return;

    this.loading = true;
  }

  get f():any{
    return this.form.controls;
  }

}
