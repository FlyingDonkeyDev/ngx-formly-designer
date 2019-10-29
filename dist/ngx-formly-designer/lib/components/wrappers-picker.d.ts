import { ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
export declare class WrappersPickerComponent implements OnChanges {
    private formlyDesignerConfig;
    private formlyDesignerService;
    modalRef: ElementRef;
    field: FormlyFieldConfig;
    selected: EventEmitter<FormlyFieldConfig>;
    wrapper: string;
    fieldEdit: FormControl;
    wrappers: string[];
    constructor(formlyDesignerConfig: FormlyDesignerConfig, formlyDesignerService: FormlyDesignerService);
    ngOnChanges(changes: SimpleChanges): void;
    private readonly $modal;
    onWrapperSelected(field: FormlyFieldConfig): void;
    edit(index: number): void;
    remove(index: number): void;
    onApply(): void;
}
