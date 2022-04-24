import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { VehiculosService } from '../vehiculo/services/vehiculos.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  public contentHeader: object
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
      filename:["",Validators.required]
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

    this._vehiculosService.getVehiculos().subscribe({
      next:(data)=>{
        this.estancias = data;
        this.downloadPDF(this.form.get('filename').value);
        this.loading = false;
      },
      error:err=>{
        console.log(err);
      }
    })

    
  }

  get f():any{
    return this.form.controls;
  }

  downloadPDF(filename:string) {
    // Extraemos el
    const DATA = document.getElementById('htmlData');
    console.log(DATA)
    // const doc = new jsPDF('p', 'pt', 'a4');
    // const options = {
    //   background: 'white',
    //   scale: 3
    // };

    // html2canvas(DATA, options).then((canvas) => {
    //   const img = canvas.toDataURL('image/PNG');

    //   // Add image Canvas to PDF
    //   const bufferX = 15;
    //   const bufferY = 15;
    //   const imgProps = (doc as any).getImageProperties(img);
    //   const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
    //   return doc;
    // }).then((docResult) => {
    //   docResult.save(filename + ".pdf");
    // });
}

}
