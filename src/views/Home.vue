<template>
  <div>
    <Map />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Map from '@/modules/map/components/Map.vue'

@Component({
  components: {
    Map,
  },
})
export default class Home extends Vue {}
</script>
