<!--
 * @description 表单项组件
!-->
<template>
  <el-form-item v-bind="colAttrs">
    <template #label>
      <div class="form-label">
        <Tooltip :content="colInfo.tips" v-if="colInfo.tips">
          <Icon class="form-label-icon" svg="QuestionFilled"></Icon>
        </Tooltip>
        <span v-if="colInfo.label">{{ colInfo.label }}：</span>
      </div>
    </template>
    <template v-if="colInfo.readOnly">
      <span v-text="data"></span>
    </template>
    <template v-else>
      <component
        :is="currentComponent"
        v-model="data"
        v-bind="colInfo.componentAttrs"
      ></component>
    </template>
  </el-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { FormColConfig } from "@/types/typings/components/CustomEL/Form";
import {
  Input,
  Select,
  DatePicker,
  Checkbox,
  CheckboxGourp,
  Icon,
  Tooltip,
} from "@/components/CustomEL";
import { generateValidate } from "@/utils/validate";

const props = defineProps<{
  modelValue: unknown;
  colInfo: FormColConfig;
}>();
const emits = defineEmits(["col-value"]);

const data = computed({
  get() {
    const readOnly = props.colInfo.readOnly;
    const modelValue = props.modelValue;
    if (readOnly && Array.isArray(modelValue)) {
      return modelValue.join("-");
    } else {
      return modelValue;
    }
  },
  set(val) {
    emits("col-value", { [props.colInfo.prop]: val });
  },
});
const colAttrs = computed(() => {
  let coverAttrs: Dynamic = {};
  const colInfo = props.colInfo;
  if (colInfo.readOnly) {
    coverAttrs = {
      rules: [],
    };
  } else {
    coverAttrs = {
      rules: generateRules(colInfo.rules),
    };
  }
  return Object.assign({}, colInfo, coverAttrs);
});
const currentComponent = computed(() => {
  const colInfo = props.colInfo;
  if (colInfo.component === "input") {
    return Input;
  } else if (colInfo.component === "select") {
    return Select;
  } else if (colInfo.component === "datePicker") {
    return DatePicker;
  } else if (colInfo.component === "checkbox") {
    return Checkbox;
  } else if (colInfo.component === "checkboxGroup") {
    return CheckboxGourp;
  } else {
    return null;
  }
});

function generateRules(rules?: Dynamic) {
  if (rules) {
    const result = [];
    for (const item of rules) {
      const temp: Dynamic = {};
      Object.assign(temp, item);
      temp.trigger = item.trigger || "blur";
      temp.validator = generateValidate;
      //   if (temp.required) {
      //     temp.requiredTemp = temp.required;
      //     delete temp.required;
      //   }
      result.push(temp);
    }
    return result;
  } else {
    return [];
  }
}
</script>
<style scoped lang="scss">
.form-label {
  display: flex;
  align-items: center;
  .form-label-icon {
    margin-right: 2px;
    cursor: pointer;
  }
}
:deep(.el-form-item__label) {
  display: flex;
}
</style>
