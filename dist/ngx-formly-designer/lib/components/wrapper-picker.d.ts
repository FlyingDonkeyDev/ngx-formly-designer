import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
export declare class WrapperPickerComponent implements OnInit {
    private formBuilder;
    private formlyDesignerConfig;
    private formlyDesignerService;
    modalRef: ElementRef;
    field: FormlyFieldConfig;
    selected: EventEmitter<FormlyFieldConfig>;
    constructor(formBuilder: FormBuilder, formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    form: FormGroup;
    fieldEdit: FormControl;
    readonly wrapper: string;
    private readonly $modal;
    ngOnInit(): void;
    add(): void;
    onApply(): void;
}
