import { ButtonExpose } from "@/types/typings/components/CustomEL/Button";
import { FormExpose } from "@/types/typings/components/CustomEL/Form";
import { InputExpose } from "@/types/typings/components/CustomEL/Input";
import { SelectExpose } from "@/types/typings/components/CustomEL/Select";
import { TableExpose } from "@/types/typings/components/CustomEL/Table";
import { EchartExpose } from "@/types/typings/components/Echart";
import { JsonEditorExpose } from "@/types/typings/components/JsonEditor";
import { TextEditorExpose } from "@/types/typings/components/Tinymce";
import { Ref, onMounted } from "vue";
/**
 * @description 获取二次包装后组件对应的 Ref，这里顺便给它抛出正确的类型(注：这里有组件 ref 命名要求；并且这个函数调用，需要在 mounted 之后)
 * @param {Ref} ref
 * @param {string} type
 * @returns {AnyObject}
 */
export function useGetComponentExpose(ref: Ref, type: "select"): SelectExpose;
export function useGetComponentExpose(ref: Ref, type: "button"): ButtonExpose;
export function useGetComponentExpose(ref: Ref, type: "input"): InputExpose;
export function useGetComponentExpose(ref: Ref, type: "form"): FormExpose;
export function useGetComponentExpose(ref: Ref, type: "table"): TableExpose;
export function useGetComponentExpose(
  ref: Ref,
  type: "textEditor"
): TextEditorExpose;
export function useGetComponentExpose(
  ref: Ref,
  type: "jsonEditor"
): JsonEditorExpose;
export function useGetComponentExpose(ref: Ref, type: "echart"): EchartExpose;
export function useGetComponentExpose(
  ref: Ref,
  type:
    | "select"
    | "button"
    | "input"
    | "form"
    | "table"
    | "textEditor"
    | "jsonEditor"
    | "echart"
) {
  const exposeName = type + "Expose";
  const currentObj = ref.value;
  const nextSearchItem = currentObj[exposeName];
  if (nextSearchItem) {
    return reSearch(nextSearchItem, exposeName);
  } else {
    return currentObj;
  }
  function reSearch(
    currentSearchItem: AnyObject,
    exposeName: string
  ): AnyObject {
    const nextSearchItem = currentSearchItem[exposeName] as AnyObject;
    if (nextSearchItem !== undefined) {
      return reSearch(nextSearchItem, exposeName);
    } else {
      return currentSearchItem;
    }
  }
}

/**
 * @description expose 的 ref 是可以在挂载完成之后可操作的。这时候，我们想追加暴露值，也是可行的。
 * @param {Ref} ref
 * @param {AnyObject} obj
 * @returns {void}
 */
export function useMixinComponentExpose(ref: Ref, obj: AnyObject) {
  onMounted(() => {
    Object.assign(ref.value, obj);
  });
}
