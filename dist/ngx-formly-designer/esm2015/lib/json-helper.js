/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { cloneDeep, isArray, isObject } from './util';
/**
 * @template T
 * @param {?} value
 * @return {?}
 */
export function decycle(value) {
    if (value == null) {
        return value;
    }
    /** @type {?} */
    let nextId = 1;
    /** @type {?} */
    const objects = new Map();
    return traverse(cloneDeep(value), (/**
     * @param {?} key
     * @param {?} v
     * @return {?}
     */
    (key, v) => {
        if (isObject(v)) {
            if (objects.has(v)) {
                /** @type {?} */
                let id = objects.get(v);
                if (!id) {
                    v.$id = id = nextId++;
                    objects.set(v, id);
                }
                return { $ref: id };
            }
            else {
                objects.set(v, 0);
            }
        }
    }));
}
/**
 * @template T
 * @param {?} obj
 * @param {?} replace
 * @return {?}
 */
function traverse(obj, replace) {
    if (isArray(obj)) {
        for (let i = 0; i < ((/** @type {?} */ (obj))).length; i++) {
            traverseValue.bind(obj, i, obj[i], replace)();
        }
    }
    else if (isObject(obj)) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                traverseValue.bind(obj, key, obj[key], replace)();
            }
        }
    }
    return obj;
}
/**
 * @param {?} key
 * @param {?} value
 * @param {?} replace
 * @return {?}
 */
function traverseValue(key, value, replace) {
    /** @type {?} */
    const replacement = replace(key, value);
    if (replacement === undefined) {
        traverse(value, replace);
    }
    else {
        this[key] = replacement;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1oZWxwZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtZm9ybWx5LWRlc2lnbmVyLyIsInNvdXJjZXMiOlsibGliL2pzb24taGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxRQUFRLENBQUM7Ozs7OztBQUV0RCxNQUFNLFVBQVUsT0FBTyxDQUFJLEtBQVE7SUFDL0IsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO1FBQ2YsT0FBTyxLQUFLLENBQUM7S0FDaEI7O1FBRUcsTUFBTSxHQUFHLENBQUM7O1VBQ1IsT0FBTyxHQUFHLElBQUksR0FBRyxFQUFlO0lBQ3RDLE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Ozs7O0lBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDekMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDYixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7O29CQUNaLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLEVBQUUsRUFBRTtvQkFDTCxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQztvQkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUM7YUFDdkI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDckI7U0FDSjtJQUNMLENBQUMsRUFBQyxDQUFDO0FBQ1AsQ0FBQzs7Ozs7OztBQUVELFNBQVMsUUFBUSxDQUFJLEdBQU0sRUFBRSxPQUE0QjtJQUNyRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG1CQUFBLEdBQUcsRUFBTyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNqRDtLQUNKO1NBQU0sSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEIsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7WUFDbkIsSUFBSSxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN6QixhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7YUFDckQ7U0FDSjtLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDOzs7Ozs7O0FBRUQsU0FBUyxhQUFhLENBQUMsR0FBUSxFQUFFLEtBQVUsRUFBRSxPQUE0Qjs7VUFDL0QsV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO0lBQ3ZDLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUMzQixRQUFRLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzVCO1NBQU07UUFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDO0tBQzNCO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNsb25lRGVlcCwgaXNBcnJheSwgaXNPYmplY3QgfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVjeWNsZTxUPih2YWx1ZTogVCk6IFQge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICBsZXQgbmV4dElkID0gMTtcbiAgICBjb25zdCBvYmplY3RzID0gbmV3IE1hcDxhbnksIG51bWJlcj4oKTtcbiAgICByZXR1cm4gdHJhdmVyc2UoY2xvbmVEZWVwKHZhbHVlKSwgKGtleSwgdikgPT4ge1xuICAgICAgICBpZiAoaXNPYmplY3QodikpIHtcbiAgICAgICAgICAgIGlmIChvYmplY3RzLmhhcyh2KSkge1xuICAgICAgICAgICAgICAgIGxldCBpZCA9IG9iamVjdHMuZ2V0KHYpO1xuICAgICAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdi4kaWQgPSBpZCA9IG5leHRJZCsrO1xuICAgICAgICAgICAgICAgICAgICBvYmplY3RzLnNldCh2LCBpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7ICRyZWY6IGlkIH07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9iamVjdHMuc2V0KHYsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyYXZlcnNlPFQ+KG9iajogVCwgcmVwbGFjZTogKGtleSwgdmFsdWUpID0+IGFueSk6IFQge1xuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAob2JqIGFzIGFueSkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYXZlcnNlVmFsdWUuYmluZChvYmosIGksIG9ialtpXSwgcmVwbGFjZSkoKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIHRyYXZlcnNlVmFsdWUuYmluZChvYmosIGtleSwgb2JqW2tleV0sIHJlcGxhY2UpKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cblxuZnVuY3Rpb24gdHJhdmVyc2VWYWx1ZShrZXk6IGFueSwgdmFsdWU6IGFueSwgcmVwbGFjZTogKGtleSwgdmFsdWUpID0+IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gcmVwbGFjZShrZXksIHZhbHVlKTtcbiAgICBpZiAocmVwbGFjZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0cmF2ZXJzZSh2YWx1ZSwgcmVwbGFjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1trZXldID0gcmVwbGFjZW1lbnQ7XG4gICAgfVxufVxuIl19