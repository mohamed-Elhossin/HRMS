import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TitlePageComponent } from '../../../../shared/components/title-page/title-page.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CustomInputComponent } from '../../../../shared/components/custom-input/custom-input.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ParagraphComponent } from '../../../../shared/components/paragraph/paragraph.component';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../../../../core/services/validation.service';

@Component({
  selector: 'app-super-admins',
  imports: [
    TitlePageComponent,
    CardComponent,
    ParagraphComponent,
    DividerComponent,
    ReactiveFormsModule,
    CustomButtonComponent,
    CustomInputComponent,
    TableComponent,
    StatusBadgeComponent,
    TitleCasePipe,
    TranslateModule,
    CustomInputComponent,
  ],
  templateUrl: './super-admins.component.html',
  styleUrl: './super-admins.component.css',
})
export class SuperAdminsComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  showDialog: boolean = false;
  loadingInvitation: boolean = false;
  loading: boolean = true;

  customTemplates: { [key: string]: TemplateRef<any> } = {};
  form: FormGroup = new FormGroup({})
  apiErrors: { [key: string]: boolean } = {};

  columns: any = [];
  data: any[] = [];

  constructor(private validationService: ValidationService,
    private fb: FormBuilder) {}

  @ViewChild('typeTemplate', { static: true }) typeTemplate!: TemplateRef<any>;
  @ViewChild('statusTemplate', { static: true })
  statusTemplate!: TemplateRef<any>;
  @ViewChild('actionTemplate', { static: true })
  actionTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.createForm();
    this.columns = [
      { key: 'name', label: 'Name', type: 'text' },
      { key: 'email', label: 'User Email', type: 'text' },
      { key: 'sentDate', label: 'Sent Date', type: 'date' },
      {
        key: 'type',
        label: 'Default',
        type: 'text',
        templateKey: 'type',
        custom: true,
      },
      {
        key: 'status',
        label: 'Status',
        type: 'text',
        templateKey: 'status',
        custom: true,
      },
      {
        key: '',
        label: 'Action',
        type: 'text',
        templateKey: 'actions',
        custom: true,
      },
    ];

    setTimeout(() => {
      this.data = [
        {
          id: '1',
          name: 'Ramy',
          email: 'it@swalac.com',
          sentDate: '1/10/2025',
          type: 'default',
          status: 'active',
          isMain: true,
        },
        {
          id: '2',
          name: 'MBL',
          email: 'it1@swalac.com',
          sentDate: '1/10/2025',
          type: 'default',
          status: 'active',
          isMain: false,
        },
        {
          id: '3',
          name: 'MSB',
          email: 'it2@swalac.com',
          sentDate: '1/10/2025',
          type: 'default',
          status: 'notActive',
          isMain: false,
        },
      ];
      this.loading = false;
    }, 1000);
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  getErrorMessage(controlName: string, fieldName?: any): string[] | null {
    const control = this.form.get(controlName);
    const fieldErrorParts = String(controlName).split('.');
    const fieldError = fieldErrorParts[fieldErrorParts.length - 1];
    if (this.apiErrors[fieldError]) {
      control?.markAsTouched();
    }
    return control
      ? this.validationService.getErrorMessage(control, controlName, fieldName, this.apiErrors)
      : null;
  }

  ngAfterViewInit(): void {
    this.customTemplates['type'] = this.typeTemplate;
    this.customTemplates['status'] = this.statusTemplate;
    this.customTemplates['actions'] = this.actionTemplate;
  }
  onSearch(event: any) {
    console.log(event.target.value);
  }

  onSuspendAdmin() {
    this.subscription.add(
      // apply api here
    )
  }

  onDeleteAdmin() {
    this.subscription.add(
      // apply api here
    )
  }

  onSubmit(){
    this.loadingInvitation = true
    this.subscription.add(
      // apply api here
    )
    setTimeout(()=>{
      this.showDialog = false
      this.loadingInvitation = false
      this.form.reset()
    }, 2000)
  }

  openDialog(): void {
    this.showDialog = !this.showDialog;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
