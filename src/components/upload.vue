<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      accept=".xlsx"
      :limit="1"
      :auto-upload="false"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      :http-request="uploadFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [] // excel文件列表
    }
  },
  methods: {
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUpload(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      const size = file.size / 1024 / 1024
      if (extension !== 'xlsx') {
        this.$message.warning('只能上传后缀是.xlsx的文件')
      }
      if (size > 10) {
        this.$message.warning('文件大小不得超过10M')
      }
    },

    // 文件状态改变
    handleChange(file, fileList) {
      if (file) {
        this.fileList = fileList.slice(-3)
      }
    },

    // 删除文件
    // eslint-disable-next-line no-unused-vars
    handleRemove(file, fileList) {
      this.fileList = []
    },

    // 文件超出个数限制
    handleExceed(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length +
          fileList.length} 个`
      )
    },

    // 文件上传成功
    // eslint-disable-next-line no-unused-vars
    handleSuccess(res, file, fileList) {
      this.$message.success('文件上传成功')
    },
    // 文件上传失败
    // eslint-disable-next-line no-unused-vars
    handleError(file, fileList) {
      this.$message.error('文件上传失败')
    },

    // 覆盖默认的上传行为，自定义上传的实现
    uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning('请上传文件')
      } else {
        const data = new FormData()
        const fileUps = file.file
        data.append('file', fileUps)
        this.$axios({
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          url: '/user/batch',
          data,
          method: 'post'
        }).then(
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )
      }
    }
  }
}
</script>
