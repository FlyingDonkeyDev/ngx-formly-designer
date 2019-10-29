import { OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FieldsService } from '../fields.service';
export declare class WrapperEditorComponent implements ControlValueAccessor, OnChanges, OnDestroy, OnInit {
    private fieldsService;
    private formBuilder;
    wrapper: string;
    private readonly subscriptions;
    private valueChangesSubscription;
    constructor(fieldsService: FieldsService, formBuilder: FormBuilder);
    invalid: boolean;
    fieldForm: FormGroup;
    field: FormlyFieldConfig;
    fields: FormlyFieldConfig[];
    protected onChange: (value: any) => void;
    protected onTouched: () => void;
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    private subscribeValueChanges;
    private updateValue;
}
