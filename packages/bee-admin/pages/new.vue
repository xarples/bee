<template>
  <w-section color="gray1" :style="{ height: '100vh' }">
    <w-container>
      <w-grid-row>
        <w-grid-column :cols="8">
          <w-grid-row>
            <w-grid-column :cols="12">
              <w-text variant="h3">Table name</w-text>
            </w-grid-column>
            <w-grid-column :cols="12">
              <w-input />
            </w-grid-column>
          </w-grid-row>
          <w-spacer size="3x"></w-spacer>
          <w-grid-row>
            <w-grid-column :cols="12">
              <w-text variant="h4">Field name</w-text>
            </w-grid-column>
          </w-grid-row>
          <w-spacer></w-spacer>
          <w-grid-row>
            <w-grid-column :cols="2">
              <w-text>Field name:</w-text>
            </w-grid-column>
            <w-grid-column>
              <w-input />
            </w-grid-column>
          </w-grid-row>
          <w-spacer></w-spacer>
          <w-grid-row>
            <w-grid-column :cols="2">
              <w-text>Type:</w-text>
            </w-grid-column>
            <w-grid-column>
              <w-select v-model="selected">
                <w-select-option value="String">String</w-select-option>
                <w-select-option value="Integer">Integer</w-select-option>
              </w-select>
            </w-grid-column>
          </w-grid-row>
          <w-spacer></w-spacer>
          <w-grid-row>
            <w-grid-column :cols="2">
              <w-text>Is primary</w-text>
            </w-grid-column>
            <w-grid-column>
              <w-checkbox></w-checkbox>
            </w-grid-column>
          </w-grid-row>
          <w-spacer></w-spacer>
          <w-grid-row>
            <w-grid-column>
              <w-button>Add field</w-button>
            </w-grid-column>
          </w-grid-row>
        </w-grid-column>
        <w-grid-column :cols="4">
          <pre>
          {{ migrationString }}
        </pre>
        </w-grid-column>
      </w-grid-row>
    </w-container>
  </w-section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  asyncData() {
    return {
      migration: {
        tableName: 'users',
        fields: {
          id: {
            type: 'String',
            primaryKey: true,
          },
          created_at: {
            type: 'String',
          },
          updated_at: {
            type: 'String',
          },
        },
      },
      selected: 'Select an option',
    }
  },
  computed: {
    migrationString() {
      // @ts-ignore
      return JSON.stringify(this.migration, null, 2)
    },
  },
})
</script>
