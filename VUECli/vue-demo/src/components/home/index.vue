<template>
    <div>
        <Heador/>
        <Slider/>
        <Finance/>
        <Footor/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Footor from "../public/footer.vue"
import Navbar from "../public/navbar.vue"
import Slider from "./hslider.vue"
import Finance from "./finance.vue"
export default {
  name: 'home',
  components: {
    Heador,
    Footor,
    Navbar,
    Slider,
    Finance
  }
}
</script>
<style lang="scss" module>
</style>
