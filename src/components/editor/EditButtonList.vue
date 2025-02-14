<script>
import omit from 'lodash/omit'
import { storeToRefs } from 'pinia'
import { computed, nextTick, ref, watch } from 'vue'

import { arrayWrap } from '@/lib/enumerable'
import { useButtonStore } from '@/stores/buttons'
import { useEditorStore } from '@/stores/editor'
import { useScenesStore } from '@/stores/scenes'
import { useUiStore } from '@/stores/ui'

import Button from 'primevue/button'

import ButtonList from './ButtonList.vue'
import Cell from '@/components/Cell.vue'
</script>

<script setup>
import { useDynamicScene } from '@/lib/dynamic-scene'

const sceneStore = useScenesStore()
const ui = useUiStore()
const editor = useEditorStore()
const buttonStore = useButtonStore()

const { scenes } = storeToRefs(sceneStore)
const { sceneName } = storeToRefs(ui)
const { activeButton, activeColumn, activeRow } = storeToRefs(editor)

const { scene } = useDynamicScene()

const buttonNames = computed(() => {
  if (activeColumn.value == null || activeRow.value == null || !scene.value) {
    return []
  }
  return arrayWrap(scene.value.buttons[activeRow.value]?.[activeColumn.value])
})

const buttonList = computed(() => {
  return buttonNames.value
    .map((buttonName) => {
      const button = buttonStore.button(buttonName)
      if (button) {
        return omit(button, ['actions', 'if', 'disabled'])
      }
    })
    .filter(Boolean)
})

const removeButton = (buttonName) => {
  sceneStore.removeButton(
    sceneName.value,
    buttonName,
    activeRow.value,
    activeColumn.value,
  )
  if (buttonName === activeButton.value) {
    nextTick(() => {
      editor.setActiveButton(buttonNames.value[0])
    })
  }
}
const newButtonName = ref('')
const addButton = () => {
  const buttonName = newButtonName.value

  if (buttonName) {
    if (!buttonStore.button(buttonName)) {
      buttonStore.addButton(buttonName, { bgColor: 0 })
    }

    sceneStore.addButton(
      sceneName.value,
      buttonName,
      activeRow.value,
      activeColumn.value,
    )
    newButtonName.value = ''
    editor.setActiveButton(buttonName)
  }
}
watch(buttonNames, (newList, oldList) => {
  if (
    editor.activeButton == null &&
    newList.length > 0 &&
    oldList.length === 0
  ) {
    editor.setActiveButton(newList[0])
  }
})
</script>

<template>
  <div class="button-list">
    <h2>
      Scene: {{ sceneName }} - row {{ activeRow }}, column {{ activeColumn }}
    </h2>
    <div class="buttons">
      <template v-for="(button, index) in buttonList" :key="buttonNames[index]">
        <div class="cell-wrapper">
          <button
            class="remove-button"
            title="remove"
            @click="removeButton(buttonNames[index])"
            v-if="!scene.readonly"
          ></button>
          <Cell
            :class="{ active: buttonNames[index] === activeButton }"
            :config="button"
            @click="editor.setActiveButton(buttonNames[index])"
            v-if="button"
            :name="buttonNames[index]"
          ></Cell>
        </div>
      </template>
    </div>

    <div v-if="!scene.readonly">
      <div class="flex-row flex-center">
        <button-list v-model="newButtonName"></button-list>
        <Button
          primary
          label="Add button"
          @click="addButton"
          :disabled="newButtonName === ''"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-list {
  padding: 20px;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.5) inset;
}
.buttons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  min-height: 100px;
}
.cell-wrapper {
  position: relative;
}

.cell {
  aspect-ratio: 1;
  height: 144px;
  width: 144px;
  transform: scale(0.8);
  outline-offset: 4px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  &.active {
    outline: 2px solid var(--color-highlight);
  }
}
.button-list button.remove-button {
  top: 16px;
  right: 16px;
}
.p-select {
  margin-bottom: 0;
}
</style>
