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
                <w-button @click="runPendingMigrations">Run all</w-button>
              </w-grid-column>
            </w-grid-row>
            <w-spacer></w-spacer>

            <w-modal>
              <w-modal-trigger>
                <w-button variant="text" block>New migration</w-button>
              </w-modal-trigger>
              <w-modal-content color="primary" size="default">
                <w-modal-header>
                  <w-modal-title>Create a new migration</w-modal-title>
                </w-modal-header>
                <w-modal-body>
                  <w-text variant="h6">
                    <strong>Migration name:</strong>
                  </w-text>
                  <w-input v-model="migrationName" />
                </w-modal-body>
                <w-modal-footer>
                  <w-button @click="createMigration(migrationName)">Save</w-button>
                </w-modal-footer>
              </w-modal-content>
            </w-modal>
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
                    <w-table-row v-for="migration of pendingMigrations" :key="migration.name">
                      <w-table-body-cell>
                        {{ migration.name }}
                        <!-- <w-text color="warning">{{ migration.name }}</w-text> -->
                      </w-table-body-cell>
                      <w-table-body-cell :style="{ justifyContent: 'flex-end' }">
                        <!-- <w-button variant="text">Run</w-button> -->
                      </w-table-body-cell>
                    </w-table-row>
                  </w-table-body>
                </w-table>
              </w-card-body>
            </w-card>

            <w-spacer size="4x"></w-spacer>

            <w-divider></w-divider>
            <w-spacer size="3x"></w-spacer>

            <w-grid-row>
              <w-grid-column>
                <w-text variant="h4">Executed migrations</w-text>
                <w-text variant="h6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</w-text>
              </w-grid-column>
              <w-grid-column auto>
                <w-button @click="revertExecutedMigrations(true)">Revert all</w-button>
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
                    <w-table-row
                      v-for="(migration, index) of executedMigrations"
                      :key="migration.name"
                    >
                      <w-table-body-cell>
                        {{ migration.name }}
                        <!-- <w-text color="success">{{ migration.name }}</w-text> -->
                      </w-table-body-cell>
                      <w-table-body-cell :style="{ justifyContent: 'flex-end' }">
                        <w-button
                          v-if="(index + 1) === executedMigrations.length"
                          variant="text"
                          @click="revertExecutedMigrations(false)"
                        >Revert</w-button>
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
import gql from 'graphql-tag'

export default Vue.extend({
  // @ts-ignore
  apollo: {
    pendingMigrations: {
      prefetch: true,
      query: gql`
        query pendingMigrations {
          pendingMigrations: migrations(filter: pending) {
            name
          }
        }
      `,
    },
    executedMigrations: {
      prefetch: true,
      query: gql`
        query executedMigrations {
          executedMigrations: migrations(filter: executed) {
            name
          }
        }
      `,
    },
  },
  asyncData() {
    return {
      migrationName: '',
    }
  },
  methods: {
    createMigration(name: string) {
      // @ts-ignore
      this.$apollo.mutate({
        mutation: gql`
          mutation generateMigration($fieldName: String!) {
            generate(fileName: $fieldName, template: migration) {
              success
            }
          }
        `,
        variables: {
          fieldName: name,
        },
      })
    },
    runPendingMigrations() {
      // @ts-ignore
      this.$apollo.mutate({
        mutation: gql`
          mutation runPendingMigrations {
            run(entity: migration) {
              success
              result {
                ... on Migration {
                  name
                  type
                }
              }
            }
          }
        `,
      })
    },
    revertExecutedMigrations(all: boolean) {
      console.log(all)
      // @ts-ignore
      this.$apollo.mutate({
        mutation: gql`
          mutation revertExecutedMigrations($all: Boolean) {
            down(entity: migration, all: $all) {
              success
              result {
                ... on Migration {
                  name
                  type
                }
              }
            }
          }
        `,
        variables: {
          all: all ? true : false,
        },
      })
    },
  },
})
</script>
