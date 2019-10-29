import { ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
export declare class FieldPickerComponent {
    private formlyDesignerConfig;
    modalRef: ElementRef;
    selected: EventEmitter<FormlyFieldConfig>;
    constructor(fb: FormBuilder, formlyDesignerConfig: FormlyDesignerConfig);
    form: FormGroup;
    readonly fieldEdit: FormControl;
    readonly type: FormControl;
    fieldGroup: boolean;
    private readonly $modal;
    add(): void;
    onApply(): void;
}
