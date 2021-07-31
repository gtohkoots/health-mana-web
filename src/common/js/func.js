export function makeToast(variant = null, content = 'default message') {
    this.$bvToast.toast(content, {
    title: `${variant || 'default'}`,
    autoHideDelay: 3000,
    variant: variant,
    solid: true
    })
}