import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  public selectTipos:Array<any> = [
    {
      name: 'Privado',
      id: 1
    }
  ];
  public loading:boolean = false;

  public data:Array<any> = [
    {
      first: "first",
      last: "last",
      handle: "handle",
    },
    {
      first: "first1",
      last: "last1",
      handle: "handle1",
    },
    {
      first: "first2",
      last: "last2",
      handle: "handle2",
    },
    {
      first: "first3",
      last: "last3",
      handle: "handle3",
    }
  ]

  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit(): void {

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
    this.data.push( {
      first: "first",
      last: "last",
      handle: "handle",
    });

    // this.submitted = true;
    // if(this.form.invalid) return;

    // this.loading = true;
  }

  get f():any{
    return this.form.controls;
  }

}
