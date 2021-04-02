// src/index.js
// 导入组件，组件必须声明 name
import sharePosters from './src/share-posters'

// 为组件提供 install 安装方法，供按需引入
sharePosters.install = function (Vue) {
 Vue.component(sharePosters.name, sharePosters)
}
// 默认导出组件
export default sharePosters