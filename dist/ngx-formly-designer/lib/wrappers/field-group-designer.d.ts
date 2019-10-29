import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, ElementRef, NgZone, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
import { FormlyDesignerConfig } from '../formly-designer-config';
import { FormlyDesignerService } from '../formly-designer.service';
export declare class FormlyDesignerFieldGroupWrapperComponent extends FieldWrapper implements AfterContentInit, AfterContentChecked, OnInit {
    private changeDetector;
    private designerConfig;
    private elementRef;
    private fieldsService;
    private formlyDesignerService;
    private zone;
    fieldComponent: ViewContainerRef;
    type: string;
    editing: boolean;
    fieldEdit: FormControl;
    fieldWrappers: string[];
    wrappers: string[];
    constructor(changeDetector: ChangeDetectorRef, designerConfig: FormlyDesignerConfig, elementRef: ElementRef, fieldsService: FieldsService, formlyDesignerService: FormlyDesignerService, zone: NgZone);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    readonly disabled: boolean;
    addWrapper(wrapper: string): void;
    removeWrapper(index: number): void;
    edit(): void;
    remove(): void;
    accept(): void;
    cancel(): void;
    onFieldSelected(field: FormlyFieldConfig): void;
    private checkDesigner;
}
