import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from './services/vehiculos.service';

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
  public selectTipos:Array<any> = [];
  public loading:boolean = false;

  public vehiculos:Array<any> = [];

  constructor(
    private _formBuilder:FormBuilder,
    private _vehiculosService:VehiculosService
  ) { }

  ngOnInit(): void {

    this._vehiculosService.getVehiculos().subscribe({
      next:(data)=>{
        this.vehiculos = data;
        console.log(data);
      },
      error:err=>{
        console.log(err);
      }
    })

    this._vehiculosService.getTipos().subscribe({
      next:(data)=>{
        this.selectTipos = data;
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
