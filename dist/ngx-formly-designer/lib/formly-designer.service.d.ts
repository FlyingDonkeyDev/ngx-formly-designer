import { FieldsService } from './fields.service';
import { FormlyConfig, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from './formly-designer-config';
import { Observable } from 'rxjs';
export declare class FormlyDesignerService {
    private designerConfig;
    private fieldsService;
    private formlyConfig;
    constructor(designerConfig: FormlyDesignerConfig, fieldsService: FieldsService, formlyConfig: FormlyConfig);
    private readonly _disabled;
    private readonly _fields;
    private readonly _model;
    disabled: boolean;
    readonly disabled$: Observable<boolean>;
    fields: FormlyFieldConfig[];
    readonly fields$: Observable<FormlyFieldConfig[]>;
    model: any;
    readonly model$: Observable<any>;
    addField(field: FormlyFieldConfig): void;
    removeField(field: FormlyFieldConfig): void;
    updateField(original: FormlyFieldConfig, modified: FormlyFieldConfig): void;
    convertField(field: FormlyFieldConfig): FormlyFieldConfig;
    convertFields(fields: FormlyFieldConfig[]): FormlyFieldConfig[];
    createDesignerFields(): FormlyFieldConfig[];
    private createPrunedFields;
    getWrappers(field: FormlyFieldConfig): string[];
    /** Prunes the field of paths not identified in the designer config */
    private createPrunedField;
    private applyProperties;
    private replaceField;
    private replaceFieldArray;
    private buildPath;
    private path;
    private unsetField;
    private removeControl;
}
