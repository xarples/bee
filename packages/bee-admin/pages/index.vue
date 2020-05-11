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
                <w-text variant="h2">Manage your migrations</w-text>
                <w-text variant="h6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, temporibus. Quos soluta rerum, eligendi qui velit
                  earum, architecto distinctio voluptatem unde aut quidem?
                  Praesentium autem explicabo.
                </w-text>
              </w-grid-column>
            </w-grid-row>

            <w-spacer size="2x"></w-spacer>

            <w-grid-row>
              <w-grid-column>
                <w-text variant="h4">Pending migrations</w-text>
                <w-text variant="h6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, temporibus.
                </w-text>
              </w-grid-column>
              <w-grid-column auto>
                <w-dropdown>
                  <w-dropdown-trigger>
                    <w-icon name="ellipsis-v" />
                  </w-dropdown-trigger>
                  <w-dropdown-list align="right">
                    <w-dropdown-item>
                      <nuxt-link to="/migrations/new">New migration</nuxt-link>
                    </w-dropdown-item>
                    <w-dropdown-item>Run pending migrations</w-dropdown-item>
                  </w-dropdown-list>
                </w-dropdown>
              </w-grid-column>
            </w-grid-row>
            <w-spacer></w-spacer>

            <w-card :shadow="false">
              <w-card-body>
                <w-table>
                  <w-table-header>
                    <w-table-row>
                      <w-table-header-cell>Name</w-table-header-cell>
                      <w-table-header-cell></w-table-header-cell>
                    </w-table-row>
                  </w-table-header>
                  <w-table-body>
                    <w-table-row v-for="item of [1, 2, 3]" :key="item">
                      <w-table-body-cell>20200105152031-create-users</w-table-body-cell>
                      <w-table-body-cell :style="{ justifyContent: 'flex-end' }">
                        <w-button variant="text">Run</w-button>
                      </w-table-body-cell>
                    </w-table-row>
                  </w-table-body>
                </w-table>
              </w-card-body>
            </w-card>

            <w-spacer size="3x"></w-spacer>

            <w-grid-row>
              <w-grid-column>
                <w-text variant="h4">Executed migrations</w-text>
                <w-text variant="h6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Nostrum, temporibus. Quos soluta rerum.
                </w-text>
              </w-grid-column>
              <w-grid-column auto>
                <w-dropdown>
                  <w-dropdown-trigger>
                    <w-icon name="ellipsis-v" />
                  </w-dropdown-trigger>
                  <w-dropdown-list align="right">
                    <w-dropdown-item
                      v-for="item of ['Revert executed migrations']"
                      :key="item"
                    >{{ item }}</w-dropdown-item>
                  </w-dropdown-list>
                </w-dropdown>
              </w-grid-column>
            </w-grid-row>

            <w-spacer></w-spacer>

            <w-card :shadow="false">
              <w-card-body>
                <w-table>
                  <w-table-header>
                    <w-table-row>
                      <w-table-header-cell>Name</w-table-header-cell>
                      <w-table-header-cell></w-table-header-cell>
                    </w-table-row>
                  </w-table-header>
                  <w-table-body>
                    <w-table-row v-for="item of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="item">
                      <w-table-body-cell>20200105152031-create-users</w-table-body-cell>
                      <w-table-body-cell :style="{ justifyContent: 'flex-end' }">
                        <w-button variant="text">Revert</w-button>
                      </w-table-body-cell>
                    </w-table-row>
                  </w-table-body>
                </w-table>
              </w-card-body>
            </w-card>

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
