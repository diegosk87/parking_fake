import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehiculosService } from '../vehiculo/services/vehiculos.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  public estancias:Array<any> = [
    {
      placa: 'Privado',
      tiempo_total: 1,
      saldo_vencido: 18.05
    }
  ];
  
  public loading:boolean = false;

  constructor(
    private _formBuilder:FormBuilder,
    private _vehiculosService:VehiculosService) { }

  ngOnInit(): void {
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
    var that = this;
    this.submitted = true;
    if(this.form.invalid) return;
    this.loading = true;
    
    this._vehiculosService.getVehiculos().subscribe({
      next:(data) => {
        this.estancias = data;
        this.downloadPDF(this.form.get('filename').value, data);
        this.loading = false;
      },
      error:err => {
        console.log(err);
      }
    });
  }
  
  get f():any{
    return this.form.controls;
  }
  
  downloadPDF(filename:string, data) {
    const doc = new jsPDF('p', 'pt', 'a4');

    doc.autoTable({
      head: this.tableHeaders,
      body: data,
      theme: 'plain'
    });

    // below line for Open PDF document in new tab
    doc.output('dataurlnewwindow')

    // below line for Download PDF document  
    doc.save(`${filename}.pdf`);
  }
}
