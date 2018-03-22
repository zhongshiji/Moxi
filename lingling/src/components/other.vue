<template>
	<div id="other">
		<div class="LL-layout">
			<div class="main-layout">
				<div class="content">
					<h1>markdown语法</h1>
					<h2>1、标题</h2>
					<p>注：# 后面保持空格</p>
					<span>代码：# 一级标题；## 二级标题；### 三级标题；等</span>
					<h2>2、TOC</h2>
					<p>注：根据标题生成目录，兼容性一般</p>
					<span>代码：[TOC] 标题</span>
					<h2>3、引用</h2>
					<span>代码：> hello world!</span>
					<h2>4、行内标记</h2>
					<p>注：用 ` 标记代码块将变成一行</p>
					<span>代码：标记之外`hello world`标记之外</span>
					<h2>5、插入链接</h2>
					<p>注：{:target="_blank"}跳转方式兼容性一般 ，多数第三方平台不支持跳转</p>
					<span>代码：[百度1](http://www.baidu.com/" 百度一下"){:target="_blank"}</span>
					<h2>6、插入图片</h2>
					<span>代码：![](./01.png '描述')</span>
					<h2>7、插入图片带有链接</h2>
					<span>代码：[![](./01.png '百度')](http://www.baidu.com){:target="_blank"}</span>
					<h2>8、序表</h2>
					<p>注：序列.后 保持空格</p>
					<span>代码(有序)：1. one 换行 2. two 换行 3. three</span>
					<br>
					<span>代码(无序)：* one 换行 * two 换行 * three</span>
					<h2>9、任务列表</h2>
					<p>注：兼容性一般 要隔开一行</p>
					<span>代码：- [x] 选项一 换行 - [ ] 选项二 换行 - [ ]  [选项3]</span>
					<br>
					<br>
					<a href="https://www.jianshu.com/p/b03a8d7b1719" target="_blank">详情请见</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {

		}
	}
}

</script>
<style scoped>
#other {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	margin: 0;
	padding: 54px 0 0 0;
	/*background: #983838;*/
}

.LL-layout {
	margin: 0 auto;
	padding-top: 20px;
	padding-bottom: 40px;
	width: 620px;
}

.main-layout {
	width: 100%;
}
</style>
