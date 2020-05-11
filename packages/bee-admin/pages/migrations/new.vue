<template>
  <w-container fluid>
    <w-navbar-menu>
      <w-container>
        <w-navbar-menu-container>
          <w-navbar-menu-list>
            <w-navbar-menu-item-logo>
              <img
                src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              />
            </w-navbar-menu-item-logo>
          </w-navbar-menu-list>
        </w-navbar-menu-container>
      </w-container>
    </w-navbar-menu>
    <w-section color="gray1" :style="{ minHeight: '100vh' }">
      <w-container>
        <w-grid-row vertical-align="top">
          <w-grid-column :cols="3">
            <w-sidebar-menu>
              <w-sidebar-menu-list title="Migrations">
                <w-sidebar-menu-item active>All</w-sidebar-menu-item>
                <w-sidebar-menu-item>Executed</w-sidebar-menu-item>
                <w-sidebar-menu-item>Pending</w-sidebar-menu-item>
              </w-sidebar-menu-list>
              <w-sidebar-menu-list title="Seeds">
                <w-sidebar-menu-item>All</w-sidebar-menu-item>
                <w-sidebar-menu-item>Executed</w-sidebar-menu-item>
                <w-sidebar-menu-item>Pending</w-sidebar-menu-item>
              </w-sidebar-menu-list>
              <w-sidebar-menu-list title="Presets">
                <w-sidebar-menu-item>Create an admin user</w-sidebar-menu-item>
                <w-sidebar-menu-item>Create a custom module</w-sidebar-menu-item>
              </w-sidebar-menu-list>
            </w-sidebar-menu>
          </w-grid-column>
          <w-grid-column :cols="9">
            <w-grid-row>
              <w-grid-column>
                <w-grid-row>
                  <w-grid-column>
                    <w-text variant="h2">Create a new migration</w-text>
                    <w-text variant="h6">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nostrum, temporibus. Quos soluta rerum, eligendi qui velit
                      earum, architecto distinctio voluptatem unde aut quidem?
                      Praesentium autem explicabo.
                    </w-text>
                  </w-grid-column>
                </w-grid-row>
              </w-grid-column>
            </w-grid-row>
            <w-spacer size="2x"></w-spacer>
            <w-grid-row>
              <w-grid-column :cols="12">
                <w-text variant="h4">
                  <strong>Table name</strong>
                </w-text>
                <w-text variant="h6">Lorem ipsum dolor sit amet consectetur.</w-text>
                <w-input></w-input>
              </w-grid-column>
            </w-grid-row>
            <w-spacer size="2x"></w-spacer>
            <w-grid-row>
              <w-grid-column :cols="12">
                <w-text variant="h4">
                  <strong>Attributes</strong>
                </w-text>
                <w-text variant="h6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum.
                </w-text>
              </w-grid-column>
            </w-grid-row>
            <w-card
              :shadow="false"
              v-for="item of ['ID', 'Created at']"
              :key="item"
              :style="{ marginBottom: '1em' }"
            >
              <w-card-body>
                <w-grid-row>
                  <w-grid-column :cols="12">
                    <w-text variant="h5">
                      <strong>{{ item }}</strong>
                    </w-text>
                  </w-grid-column>
                  <w-grid-column>
                    <w-text variant="h6">
                      <strong>Name</strong>
                    </w-text>
                    <w-input></w-input>
                  </w-grid-column>
                  <w-grid-column>
                    <w-text variant="h6">
                      <strong>Type</strong>
                    </w-text>
                    <w-select modelValue="STRING">
                      <w-select-option value="STRING">STRING</w-select-option>
                      <w-select-option value="INTEGER">INTEGER</w-select-option>
                      <w-select-option value="UUID">UUID</w-select-option>
                    </w-select>
                  </w-grid-column>
                </w-grid-row>
              </w-card-body>
            </w-card>

            <w-grid-row>
              <w-grid-column>
                <w-button variant="text">Add new field</w-button>
              </w-grid-column>
            </w-grid-row>
            <w-spacer></w-spacer>
          </w-grid-column>
        </w-grid-row>
      </w-container>
    </w-section>
  </w-container>
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
