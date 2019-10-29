import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldsService } from './fields.service';
import { FormlyDesignerService } from './formly-designer.service';
export declare class FormlyDesignerComponent implements OnDestroy, OnInit {
    private fieldsService;
    private formBuilder;
    private formlyDesignerService;
    formlyFormContainer: any;
    fieldsChange: EventEmitter<FormlyFieldConfig[]>;
    modelChange: EventEmitter<any>;
    types: string[];
    wrappers: string[];
    properties: string[];
    debugFields: FormlyFieldConfig[];
    form: FormGroup;
    options: any;
    private readonly subscriptions;
    constructor(fieldsService: FieldsService, formBuilder: FormBuilder, formlyDesignerService: FormlyDesignerService);
    disabled: boolean;
    fields: FormlyFieldConfig[];
    model: any;
    ngOnInit(): void;
    ngOnDestroy(): void;
    onFieldSelected(field: FormlyFieldConfig): void;
}
