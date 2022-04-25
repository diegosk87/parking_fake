import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from '../vehiculo/services/vehiculos.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Vehiculo } from '../vehiculo/models/vehiculo';
import { TareasService } from './services/tareas.service';
import { Estancia } from '../home/models/estancia';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  public tableHeaders:any = [['#', 'Núm. placa', 'Tiempo estacionado (min.)', 'Cantidad a pagar']]
  public contentHeader: object;
  public form:FormGroup;
  public submitted:boolean = false;

  public vehiculos:Array<Vehiculo> = [];
  
  public loading:boolean = false;
  public actionLoading:boolean = false;

  constructor(
    private _formBuilder:FormBuilder,
    private _tareasService:TareasService,
    private _vehiculosService:VehiculosService
  ) { }

  ngOnInit(): void {
    this.loadVehiculos();

    this.form = this._formBuilder.group({
      filename:["", Validators.required]
    });

    this.contentHeader = {
      headerTitle: 'Tareas',
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
    this.submitted = true;
    if(this.form.invalid) return;
    this.loading = true;

    this.downloadPDF(this.form.controls.filename.value, this.vehiculos);
  }
  
  get f():any{
    return this.form.controls;
  }

  private loadVehiculos(): void {
    this._vehiculosService.getVehiculos().subscribe({
      next:(result: Array<Vehiculo>)=>{
        this.vehiculos = result;
        console.log(result);
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  public comienzaMes(): void {
    this.actionLoading = true;

    this._tareasService.postComienzaMes().subscribe({
      next: result => {
        console.log(result);
        this._vehiculosService.postComienzaMes().subscribe({
          next: result => {
            console.log(result);
            this.actionLoading = false;
            this.loadVehiculos();
          },
          error: err => {
            console.log(err);
            this.actionLoading = false;
          }
        });
      },
      error: err => {
        console.log(err);
        this.actionLoading = false;
      }
    });
  }
  
  downloadPDF(filename:string, data:Array<Vehiculo>) {
    const doc = new jsPDF('p', 'pt', 'a4');
    var formatedData:Array<Array<string>> = [];
    data.forEach((item, index) => {
      let temp = [];
      temp.push(index + '');
      temp.push(item.placa);
      temp.push(item.tiempo_total);
      temp.push(`$ ${item.saldo_vencido}`);
      formatedData.push(temp);
    });


    doc.autoTable({
      head: this.tableHeaders,
      body: formatedData,
      theme: 'plain'
    });

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(`${filename}.pdf`);

    this.loading = false;
  }
}
