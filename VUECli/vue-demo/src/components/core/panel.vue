<template lang="html">
    <div>
        <section :class=[panelClass,cname]></section>
        <h4>-{{ title }}-</h4>
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        cname: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            panelClass: "panel",
        }
    },
}
</script>

<style lang="scss">
@import "../../assets/css/element.scss";
.panel{
    @include panel
}
</style>
