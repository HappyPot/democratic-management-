
export default {
  data(){
    return {
      accessSubmit:true
    }
  },
  methods: {
     // 重置错误提示
    resetErrorTip() {
      let arr = Array.from(document.getElementsByClassName('errorTip'))
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        element.style.display = 'none'
      }
    },
    // 表单校验
    fromValidate(from) {
      this.resetErrorTip()
      this.accessSubmit = true
      for (let key in from) {
        let arr = Array.from(document.getElementsByClassName('errorTip'))
        for (let index = 0; index < arr.length; index++) {
          const element = arr[index]
          if (element.getAttribute('data-name') == key && !from[key]) {
            element.style.display = 'block'
            this.accessSubmit = false
          }
        }
      }
      return
    },
  }
}
