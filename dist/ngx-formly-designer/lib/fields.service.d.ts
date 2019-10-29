import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyDesignerConfig } from './formly-designer-config';
export declare class FieldsService {
    private formlyDesignerConfig;
    constructor(formlyDesignerConfig: FormlyDesignerConfig);
    getFullKeyPath(field: FormlyFieldConfig, fields: FormlyFieldConfig[]): (string | number)[];
    getTypeFields(type: string): FormlyFieldConfig[];
    getWrapperFields(wrapper: string): FormlyFieldConfig[];
    /** Check the field for control type conflict */
    checkField(field: FormlyFieldConfig, fields: FormlyFieldConfig[], parent?: FormlyFieldConfig): boolean;
    mutateField(field: FormlyFieldConfig, designerField: boolean): FormlyFieldConfig;
    mutateFields(fields: FormlyFieldConfig[], designerFields: boolean): void;
    private getFields;
    private getDesignerOptions;
}
