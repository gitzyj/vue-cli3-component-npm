
<template>
    <div class="share-posters">
        <div class="config-title">
            <span class="save" @click="down_img">保存图片</span>
        </div>

        <div v-if="!imgUrl" class="canvs-box"  ref="ref-image-wrapper" >
                <!--海报封面图-->
                <img draggable="false" crossorigin="anonymous" class="bg-img" :src="shareConfig.shareImg" alt="">
                <div  class="sharing-words" :style="{height:qrCode.height+'px',background:'red'}">
                    <div  :style="{color:shareConfig.color,'font-size':shareConfig.fontSize}">{{shareConfig.title}}</div>
                </div>
                <!--二维码-->
                <div  @dragstart="get_move($event)" :draggable="draggableCode" class="qr-code" id="qrCode" ref="ref-qr-code"></div>
        </div>
        <img draggable="false" class="share-img" v-if="imgUrl" :src="imgUrl" alt="">
        
    </div>
</template>

<script>
import html2canvas from "html2canvas"; // 指定dom 元素生成图片
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
                draggableCode:true, // 禁止拖动
                colorDark:'black',  //二维码颜色
                colorLight:'#fff' //二维码背景色
            })
        },
        shareConfig:{
            type: Object,
            default:() => ({
                title:'七猫小说:扫码一起来看书', //分享标语
                color:'#fff', // 分享字颜色
                fontSize:'19px', // 字体大小
                shareImg: 'https://cdn.wtzw.com/bookimg/public/images/cover/5faa41ba797a9_360x480.jpg', // 分享图
                dragstart:true //是否可以拖动
            })
        },
        options:{
            type: Object,
            default:() => ({
                allowTaint:true, //是否允许跨域图像污染画布
                proxy:'https://cdn.wtzw.com/bookimg/public/images/cover/5faa41ba797a9_360x480.jpg', //代理图像地址
                // dpi: 300,  //解决生产图片模糊
                // scale: window.devicePixelRatio // 设备像素比
            })
        },

    },
    directives: {
    drag(el, bindings) {
        console.log(bindings)
      el.onmousedown = function(e) {
        var disx = e.pageX - el.offsetLeft
        var disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + 'px'
          el.style.top = e.pageY - disy + 'px'
        }
        document.onmouseup = function() {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  },
    data() {
        // 这里存放数据
        return {
            imgUrl:'', //生成的图片是base64格式
            draggableCode:false, // 开启二维码能否拖动
        };
    },
    // 监听属性 类似于data概念
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {

        //移动事件 pc端生效
        get_move(evt){
            let _draggableCode =this.draggableCode;
            if(!_draggableCode) return false
            let el =evt.path[1]
            console.log('移动',evt.path[1])
            el.onmousedown = function(e) {
                var disx = e.pageX - el.offsetLeft
                var disy = e.pageY - el.offsetTop
                document.onmousemove = function (e) {
                el.style.left = e.pageX - disx + 'px'
                el.style.top = e.pageY - disy + 'px'
                }
                document.onmouseup = function() {
                document.onmousemove = document.onmouseup = null
                }
            }
        },
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
        // 下载图片 scale 渲染比例 //dpi解决生产图片模糊
        down_img() {
            html2canvas(this.$refs['ref-image-wrapper'],this.options).then(canvas => {     //ref-image-wrapper转换图片的dom
                    let _dataURL = canvas.toDataURL("image/png"); 
                    this.imgUrl = _dataURL;
                    //回调创建a链接下载图片
                    let _link = document.createElement('a');
                    _link.href = this.imgUrl;
                    _link.download = 'colorCard';
                    document.body.appendChild(_link);
                    _link.click();
                    document.body.removeChild(_link);
                }); 
        }
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log('像素比',window.devicePixelRatio)
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.bind_QRCode()
    },
    beforeDestroy() {}, // 生命周期 - 销毁之前
    destroyed() {}// 生命周期 - 销毁完成
};
</script>
<style scoped lang="scss">
.share-posters{
    position: relative;
    height: 100%;
    width: 375px;
    overflow: hidden;
    .config-title{
        display: flex;
        margin-bottom: 10px;
        .save{
            padding: 5px;
            color: #fff;
            background-color: #fcc800;
            border-color: #fcc800;
            text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
            box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .canvs-box{
        width: 100%;
        min-height: 300px;
        position: relative;
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .bg-img{
        width: 100%;
        vertical-align: middle;
    }
    #qrCode{
        position: absolute;
        bottom: 10px;
        right: 0;
        width: 50px;
        height: 50px;
        margin-right: 10px;
        margin-top: 20px;
        cursor: pointer;
    }
    .share-img{
        width: 100%;
        height: auto;
    }
    .sharing-words{
        padding: 10px;
        display: flex;
        align-items: center;
    }
}
</style>
