/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export { cloneDeep, get, set, unset } from 'lodash-es';
/** @type {?} */
const keyPathMemberName = '_formlyDesignerKeyPath';
// Source: https://github.com/formly-js/ngx-formly/blob/master/src/core/src/lib/utils.ts
/**
 * @param {?} field
 * @return {?}
 */
export function getKeyPath(field) {
    /* We store the keyPath in the field for performance reasons. This function will be called frequently. */
    if (!((/** @type {?} */ (field)))[keyPathMemberName] || ((/** @type {?} */ (field)))[keyPathMemberName].key !== field.key) {
        /** @type {?} */
        let keyPath = [];
        if (field.key) {
            /* Also allow for an array key, hence the type check  */
            /** @type {?} */
            const pathElements = typeof field.key === 'string' ? field.key.split('.') : field.key;
            for (let pathElement of pathElements) {
                if (typeof pathElement === 'string') {
                    /* replace paths of the form names[2] by names.2, cfr. angular formly */
                    pathElement = pathElement.replace(/\[(\w+)\]/g, '.$1');
                    keyPath = keyPath.concat(pathElement.split('.'));
                }
                else {
                    keyPath.push(pathElement);
                }
            }
            for (let i = 0; i < keyPath.length; i++) {
                /** @type {?} */
                const pathElement = keyPath[i];
                if (typeof pathElement === 'string' && /^\d+$/.test(pathElement)) {
                    keyPath[i] = parseInt(pathElement, 10);
                }
            }
        }
        ((/** @type {?} */ (field)))[keyPathMemberName] = {
            key: field.key,
            path: keyPath,
        };
    }
    return ((/** @type {?} */ (field)))[keyPathMemberName].path.slice();
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
export function equalType(a, b) {
    return (!a.fieldArray === !b.fieldArray) && (!a.fieldGroup === !b.fieldGroup);
}
/**
 * @param {?} fields
 * @param {?} callback
 * @param {?=} path
 * @param {?=} parent
 * @return {?}
 */
export function traverseFields(fields, callback, path, parent) {
    path = path || [];
    for (const field of fields) {
        if (callback(field, path, parent)) {
            return true;
        }
        if (field.fieldArray) {
            if (traverseFields([field.fieldArray], callback, path.concat(getKeyPath(field)), field)) {
                return true;
            }
        }
        else if (field.fieldGroup) {
            if (traverseFields(field.fieldGroup, callback, path.concat(getKeyPath(field)), field)) {
                return true;
            }
        }
    }
}
// https://stackoverflow.com/a/40294058
// export const cloneDeep = (obj, hash = new WeakMap()): typeof obj => {
//   if (Object(obj) !== obj) return obj; // primitives
//   if (hash.has(obj)) return hash.get(obj); // cyclic reference
//   const result = obj instanceof Date ? new Date(obj)
//     : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
//       : obj.constructor ? new obj.constructor()
//         : Object.create(null);
//   hash.set(obj, result);
//   if (obj instanceof Map)
//     Array.from(obj, ([key, val]) => result.set(key, cloneDeep(val, hash)));
//   return Object.assign(result, ...Object.keys(obj).map(
//     key => ({ [key]: cloneDeep(obj[key], hash) })));
// };
/** @type {?} */
export const isArray = Array.isArray;
// https://stackoverflow.com/a/28953167
/** @type {?} */
export const isEmpty = (/**
 * @param {?} val
 * @return {?}
 */
(val) => {
    if (val === undefined)
        return true;
    else if (typeof (val) === 'function' || typeof (val) === 'number' || typeof (val) === 'boolean'
        || Object.prototype.toString.call(val) === '[object Date]')
        return false;
    else if (val == null || val.length === 0) // null or 0 length array
        return true;
    else if (typeof (val) === 'object') {
        // empty object
        /** @type {?} */
        let r;
        for (const _ in val)
            r = false;
        return r;
    }
    return false;
});
/** @type {?} */
export const isFunction = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'function');
/** @type {?} */
export const isObject = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'object' && val != null);
/** @type {?} */
export const isString = (/**
 * @param {?} val
 * @return {?}
 */
(val) => typeof val === 'string' || val instanceof String);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1mb3JtbHktZGVzaWduZXIvIiwic291cmNlcyI6WyJsaWIvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLFdBQVcsQ0FBQzs7TUFFakQsaUJBQWlCLEdBQUcsd0JBQXdCOzs7Ozs7QUFHbEQsTUFBTSxVQUFVLFVBQVUsQ0FBQyxLQUFzRTtJQUM3Rix5R0FBeUc7SUFDekcsSUFBSSxDQUFDLENBQUMsbUJBQUssS0FBSyxFQUFBLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsbUJBQUssS0FBSyxFQUFBLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFOztZQUNuRixPQUFPLEdBQXdCLEVBQUU7UUFDckMsSUFBSSxLQUFLLENBQUMsR0FBRyxFQUFFOzs7a0JBRUwsWUFBWSxHQUFHLE9BQU8sS0FBSyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNyRixLQUFLLElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtnQkFDbEMsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7b0JBQ2pDLHdFQUF3RTtvQkFDeEUsV0FBVyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUN2RCxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO3FCQUFNO29CQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQzdCO2FBQ0o7WUFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7c0JBQy9CLFdBQVcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUM5RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztpQkFDMUM7YUFDSjtTQUNKO1FBQ0QsQ0FBQyxtQkFBSyxLQUFLLEVBQUEsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7WUFDOUIsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHO1lBQ2QsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztLQUNMO0lBRUQsT0FBTyxDQUFDLG1CQUFLLEtBQUssRUFBQSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEQsQ0FBQzs7Ozs7O0FBR0QsTUFBTSxVQUFVLFNBQVMsQ0FBQyxDQUFvQixFQUFFLENBQW9CO0lBQ2hFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbEYsQ0FBQzs7Ozs7Ozs7QUFFRCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQTJCLEVBQ3RELFFBQTZHLEVBQzdHLElBQTBCLEVBQzFCLE1BQTBCO0lBQzFCLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ2xCLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxFQUFFO1FBQ3hCLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksS0FBSyxDQUFDLFVBQVUsRUFBRTtZQUNsQixJQUFJLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRTtnQkFDckYsT0FBTyxJQUFJLENBQUM7YUFDZjtTQUNKO2FBQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3pCLElBQUksY0FBYyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUU7Z0JBQ25GLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtLQUNKO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCRCxNQUFNLE9BQU8sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPOzs7QUFJcEMsTUFBTSxPQUFPLE9BQU87Ozs7QUFBRyxDQUFDLEdBQVEsRUFBVyxFQUFFO0lBQ3pDLElBQUksR0FBRyxLQUFLLFNBQVM7UUFDakIsT0FBTyxJQUFJLENBQUM7U0FFWCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxVQUFVLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUztXQUN4RixNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBZTtRQUMxRCxPQUFPLEtBQUssQ0FBQztTQUVaLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBUyx5QkFBeUI7UUFDdEUsT0FBTyxJQUFJLENBQUM7U0FFWCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRLEVBQUU7OztZQUc1QixDQUFDO1FBRUwsS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHO1lBQ2YsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUVkLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDLENBQUE7O0FBRUQsTUFBTSxPQUFPLFVBQVU7Ozs7QUFBRyxDQUFDLEdBQVEsRUFBVyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssVUFBVSxDQUFBOztBQUUxRSxNQUFNLE9BQU8sUUFBUTs7OztBQUFHLENBQUMsR0FBUSxFQUFXLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQTs7QUFFckYsTUFBTSxPQUFPLFFBQVE7Ozs7QUFBRyxDQUFDLEdBQVEsRUFBVyxFQUFFLENBQUMsT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsWUFBWSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtbHlGaWVsZENvbmZpZyB9IGZyb20gJ0BuZ3gtZm9ybWx5L2NvcmUnO1xuXG5leHBvcnQgeyBjbG9uZURlZXAsIGdldCwgc2V0LCB1bnNldCB9IGZyb20gJ2xvZGFzaC1lcyc7XG5cbmNvbnN0IGtleVBhdGhNZW1iZXJOYW1lID0gJ19mb3JtbHlEZXNpZ25lcktleVBhdGgnO1xuXG4vLyBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvbmd4LWZvcm1seS9ibG9iL21hc3Rlci9zcmMvY29yZS9zcmMvbGliL3V0aWxzLnRzXG5leHBvcnQgZnVuY3Rpb24gZ2V0S2V5UGF0aChmaWVsZDogeyBrZXk/OiBzdHJpbmcgfCBzdHJpbmdbXSwgZmllbGRHcm91cD86IGFueSwgZmllbGRBcnJheT86IGFueSB9KTogKHN0cmluZyB8IG51bWJlcilbXSB7XG4gICAgLyogV2Ugc3RvcmUgdGhlIGtleVBhdGggaW4gdGhlIGZpZWxkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGZyZXF1ZW50bHkuICovXG4gICAgaWYgKCEoPGFueT5maWVsZClba2V5UGF0aE1lbWJlck5hbWVdIHx8ICg8YW55PmZpZWxkKVtrZXlQYXRoTWVtYmVyTmFtZV0ua2V5ICE9PSBmaWVsZC5rZXkpIHtcbiAgICAgICAgbGV0IGtleVBhdGg6IChzdHJpbmcgfCBudW1iZXIpW10gPSBbXTtcbiAgICAgICAgaWYgKGZpZWxkLmtleSkge1xuICAgICAgICAgICAgLyogQWxzbyBhbGxvdyBmb3IgYW4gYXJyYXkga2V5LCBoZW5jZSB0aGUgdHlwZSBjaGVjayAgKi9cbiAgICAgICAgICAgIGNvbnN0IHBhdGhFbGVtZW50cyA9IHR5cGVvZiBmaWVsZC5rZXkgPT09ICdzdHJpbmcnID8gZmllbGQua2V5LnNwbGl0KCcuJykgOiBmaWVsZC5rZXk7XG4gICAgICAgICAgICBmb3IgKGxldCBwYXRoRWxlbWVudCBvZiBwYXRoRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhdGhFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvKiByZXBsYWNlIHBhdGhzIG9mIHRoZSBmb3JtIG5hbWVzWzJdIGJ5IG5hbWVzLjIsIGNmci4gYW5ndWxhciBmb3JtbHkgKi9cbiAgICAgICAgICAgICAgICAgICAgcGF0aEVsZW1lbnQgPSBwYXRoRWxlbWVudC5yZXBsYWNlKC9cXFsoXFx3KylcXF0vZywgJy4kMScpO1xuICAgICAgICAgICAgICAgICAgICBrZXlQYXRoID0ga2V5UGF0aC5jb25jYXQocGF0aEVsZW1lbnQuc3BsaXQoJy4nKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aC5wdXNoKHBhdGhFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleVBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoRWxlbWVudCA9IGtleVBhdGhbaV07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXRoRWxlbWVudCA9PT0gJ3N0cmluZycgJiYgL15cXGQrJC8udGVzdChwYXRoRWxlbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5UGF0aFtpXSA9IHBhcnNlSW50KHBhdGhFbGVtZW50LCAxMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICg8YW55PmZpZWxkKVtrZXlQYXRoTWVtYmVyTmFtZV0gPSB7XG4gICAgICAgICAgICBrZXk6IGZpZWxkLmtleSxcbiAgICAgICAgICAgIHBhdGg6IGtleVBhdGgsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuICg8YW55PmZpZWxkKVtrZXlQYXRoTWVtYmVyTmFtZV0ucGF0aC5zbGljZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBlcXVhbFR5cGUoYTogRm9ybWx5RmllbGRDb25maWcsIGI6IEZvcm1seUZpZWxkQ29uZmlnKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghYS5maWVsZEFycmF5ID09PSAhYi5maWVsZEFycmF5KSAmJiAoIWEuZmllbGRHcm91cCA9PT0gIWIuZmllbGRHcm91cCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUZpZWxkcyhmaWVsZHM6IEZvcm1seUZpZWxkQ29uZmlnW10sXG4gICAgY2FsbGJhY2s6IChmaWVsZDogRm9ybWx5RmllbGRDb25maWcsIHBhdGg/OiAoc3RyaW5nIHwgbnVtYmVyKVtdLCBwYXJlbnQ/OiBGb3JtbHlGaWVsZENvbmZpZykgPT4gYm9vbGVhbiB8IGFueSxcbiAgICBwYXRoPzogKHN0cmluZyB8IG51bWJlcilbXSxcbiAgICBwYXJlbnQ/OiBGb3JtbHlGaWVsZENvbmZpZyk6IGJvb2xlYW4gfCBhbnkge1xuICAgIHBhdGggPSBwYXRoIHx8IFtdO1xuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayhmaWVsZCwgcGF0aCwgcGFyZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpZWxkLmZpZWxkQXJyYXkpIHtcbiAgICAgICAgICAgIGlmICh0cmF2ZXJzZUZpZWxkcyhbZmllbGQuZmllbGRBcnJheV0sIGNhbGxiYWNrLCBwYXRoLmNvbmNhdChnZXRLZXlQYXRoKGZpZWxkKSksIGZpZWxkKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGZpZWxkLmZpZWxkR3JvdXApIHtcbiAgICAgICAgICAgIGlmICh0cmF2ZXJzZUZpZWxkcyhmaWVsZC5maWVsZEdyb3VwLCBjYWxsYmFjaywgcGF0aC5jb25jYXQoZ2V0S2V5UGF0aChmaWVsZCkpLCBmaWVsZCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQwMjk0MDU4XG4vLyBleHBvcnQgY29uc3QgY2xvbmVEZWVwID0gKG9iaiwgaGFzaCA9IG5ldyBXZWFrTWFwKCkpOiB0eXBlb2Ygb2JqID0+IHtcbi8vICAgaWYgKE9iamVjdChvYmopICE9PSBvYmopIHJldHVybiBvYmo7IC8vIHByaW1pdGl2ZXNcbi8vICAgaWYgKGhhc2guaGFzKG9iaikpIHJldHVybiBoYXNoLmdldChvYmopOyAvLyBjeWNsaWMgcmVmZXJlbmNlXG4vLyAgIGNvbnN0IHJlc3VsdCA9IG9iaiBpbnN0YW5jZW9mIERhdGUgPyBuZXcgRGF0ZShvYmopXG4vLyAgICAgOiBvYmogaW5zdGFuY2VvZiBSZWdFeHAgPyBuZXcgUmVnRXhwKG9iai5zb3VyY2UsIG9iai5mbGFncylcbi8vICAgICAgIDogb2JqLmNvbnN0cnVjdG9yID8gbmV3IG9iai5jb25zdHJ1Y3RvcigpXG4vLyAgICAgICAgIDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbi8vICAgaGFzaC5zZXQob2JqLCByZXN1bHQpO1xuLy8gICBpZiAob2JqIGluc3RhbmNlb2YgTWFwKVxuLy8gICAgIEFycmF5LmZyb20ob2JqLCAoW2tleSwgdmFsXSkgPT4gcmVzdWx0LnNldChrZXksIGNsb25lRGVlcCh2YWwsIGhhc2gpKSk7XG4vLyAgIHJldHVybiBPYmplY3QuYXNzaWduKHJlc3VsdCwgLi4uT2JqZWN0LmtleXMob2JqKS5tYXAoXG4vLyAgICAga2V5ID0+ICh7IFtrZXldOiBjbG9uZURlZXAob2JqW2tleV0sIGhhc2gpIH0pKSk7XG4vLyB9O1xuXG5leHBvcnQgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cblxuLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI4OTUzMTY3XG5leHBvcnQgY29uc3QgaXNFbXB0eSA9ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICh2YWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICBlbHNlIGlmICh0eXBlb2YgKHZhbCkgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mICh2YWwpID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgKHZhbCkgPT09ICdib29sZWFuJ1xuICAgICAgICB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBlbHNlIGlmICh2YWwgPT0gbnVsbCB8fCB2YWwubGVuZ3RoID09PSAwKSAgICAgICAgLy8gbnVsbCBvciAwIGxlbmd0aCBhcnJheVxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGVsc2UgaWYgKHR5cGVvZiAodmFsKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gZW1wdHkgb2JqZWN0XG5cbiAgICAgICAgbGV0IHI7XG5cbiAgICAgICAgZm9yIChjb25zdCBfIGluIHZhbClcbiAgICAgICAgICAgIHIgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG5leHBvcnQgY29uc3QgaXNGdW5jdGlvbiA9ICh2YWw6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcblxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKHZhbDogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwgIT0gbnVsbDtcblxuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKHZhbDogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyB8fCB2YWwgaW5zdGFuY2VvZiBTdHJpbmc7XG4iXX0=