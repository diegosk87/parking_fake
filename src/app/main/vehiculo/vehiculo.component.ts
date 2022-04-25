import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from './services/vehiculos.service';
import { Vehiculo } from './models/vehiculo';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.scss']
})
export class VehiculoComponent implements OnInit {
  public contentHeader: object
  public form:FormGroup;
  public submitted:boolean = false;
  public selectTiposLoading:boolean = true;
  public selectTipos:Array<any> = [];
  public loading:boolean = false;

  public vehiculos:Array<Vehiculo> = [];

  constructor(
    private _formBuilder:FormBuilder,
    private _vehiculosService:VehiculosService
  ) { }

  ngOnInit(): void {
    this.cargarVehiculos();
    this._vehiculosService.getTipos().subscribe({
      next:(data)=>{
        this.selectTipos = data;
        this.selectTiposLoading = false;
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

  private cargarVehiculos(): void {
    this._vehiculosService.getVehiculos().subscribe({
      next:(data) => {
        this.vehiculos = data;
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  public onSubmit():void {
    this.submitted = true;
    if(this.form.invalid) return;

    this.loading = true;

    this._vehiculosService.postVehiculo({
      placa: this.form.controls.placa.value,
      tipo: this.form.controls.tipo.value,
      descripcion: "hola",
      tiempo_total: 0,
      saldo_vencido: 0
    }).subscribe({
      next: vehiculo => {
        this.cargarVehiculos();
        console.log(vehiculo);
        this.loading = false;
      },
      error: err => {
        this.loading = false;
      }
    });
    
  }

  get f():any{
    return this.form.controls;
  }

}
