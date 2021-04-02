
<template>
    <div class="share-posters">
        <div class="config-title">
             <a id="downloadImg"></a>
             <span @click="init_canvas">生成海报</span>
             <button class="button" @click="downloadImg" title="下载">下载</button>
        </div>
        <VueCropper></VueCropper>
        <div class="canvs-box"  ref="ref-image-wrapper">
            <canvas id="canvas">
            </canvas>
           <div id="qrCode"  ref="ref-qr-code"></div>
        </div>
    </div>
</template>

<script>
import { VueCropper } from "vue-cropper"
import QRCode from 'qrcodejs2';
export default {
    name: 'sharePosters',
    props:{
        qrCode:{
            type: Object,
            default:() => ({
                url: 'https://www.baidu.com',
                width:50,
                height:50,
                colorDark:'red',  //二维码颜色
                colorLight:'#fff' //二维码背景色
            })
        }
    },
    data() {
        // 这里存放数据
        return {
            imgUrl:'' // 生成的图片 地址
        };
    },
    components:{
        VueCropper
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        bind_QRCode () {
            new QRCode(this.$refs['ref-qr-code'], {
            text: this.qrCode.url,
            width: this.qrCode.width,
            height: this.qrCode.width,
            colorDark: this.qrCode.colorDark, //二维码颜色
            colorLight: this.qrCode.colorLight, //二维码背景色
            correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
            })
        },
        init_canvas () {
            var canvas = document.getElementById('canvas')
            var ctx = canvas.getContext('2d')

            canvas.width = 300
            canvas.height = 300

            // 画圆
            ctx.fillStyle = 'yellow'
            ctx.fillRect(0, 0, 50, 100)

            ctx.strokeStyle = 'blue'
            ctx.strokeRect(0, 120, 50, 100)

            var img = new Image()
            img.onload = () => {
            // 画图片
            ctx.drawImage(img, 60, 0)
            // toImage
            var dataImg = new Image()
            dataImg.src = canvas.toDataURL('image/png')
            document.body.appendChild(dataImg) // 长按图片保存
            }
            img.crossOrigin = 'anonymous'
            img.src = ''
        },
        downloadImg(){
          var img = document.getElementById('qrCode').getElementsByTagName('img')[0];
       // 构建画布
          var canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
      // 构造url
          var url = canvas.toDataURL('image/png');
          document.getElementById('downloadImg').setAttribute('href', url);
          document.getElementById('downloadImg').setAttribute('download', '邮箱+推荐二维码.jpg');
          document.getElementById('downloadImg').click();
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.bind_QRCode()
    },
    beforeCreate() {}, // 生命周期 - 创建之前, //生命周期 - 创建之前
    beforeMount() {}, // 生命周期 - 挂载之前
    beforeUpdate() {}, // 生命周期 - 更新之前
    updated() {}, // 生命周期 - 更新之后
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}, // 生命周期 - 销毁完成
    activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped lang="scss">
.share-posters{

}
</style>
