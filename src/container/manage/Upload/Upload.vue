<template>
    <section class="chart-container">
    <el-upload
	  class="upload-demo"
	  action="http://192.168.11.103:8011/upload/singleFileUpload"
	  :on-change="handleChange"
	  :file-list="fileList3">
	  <el-button size="small" type="primary">点击上传</el-button>
	  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
	</el-upload>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        fileList3: [{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }, {
          name: 'food2.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          status: 'finished'
        }]
      };
    },
    methods: {
      handleChange(file, fileList) {
        this.fileList3 = fileList.slice(-3);
      }
    }
  }
</script>

<style scoped>
</style>
