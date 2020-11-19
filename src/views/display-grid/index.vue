<template>
  <div>
    <h1>grid布局</h1>
    <div class="container">
      <div class="col-1 item-1">
        单元格1
      </div>
      <div class="col-2">2</div>
      <div class="col-3">3</div>
      <div class="col-4">4</div>
      <div class="col-5">5</div>
      <div class="col-6">6</div>
      <div class="col-7">7</div>
      <div class="col-8">8</div>
      <div class="col-9">9</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 200px); // grid布局模板列设置
  grid-template-rows: repeat(4, 200px); // grid布局模板行设置
  // repeat()接受两个参数，第一个参数是重复的次数（上例是3），第二个参数是所要重复的值。
  // grid-template-columns: repeat(3, 33.33%);
  // grid-template-rows: repeat(3, 33.33%);

  // 有时，单元格的大小是固定的，但是容器的大小不确定。如果希望每一行（或每一列）容纳尽可能多的单元格，这时可以使用auto-fill关键字表示自动填充。
  // grid-template-columns: repeat(auto-fill, 100px);

  // 如果两列的宽度分别为1fr和2fr，就表示后者是前者的两倍。
  // grid-template-columns: 1fr 2fr;

  // 第一列的宽度为150像素，第1列的宽度是第二列的一半，第二列的宽度是第三列的一半
  // grid-template-columns: 150px 1fr 2fr;

  // auto关键字表示由浏览器自己决定长度。
  // grid-template-columns: 100px auto 100px;

  // grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
  // grid-row-gap: 10px;
  // grid-column-gap: 10px;

  // grid-gap属性是grid-column-gap和grid-row-gap的合并简写形式，语法如下。
  // grid-gap: 10px 10px; // 相当于上面的代码

  // 根据最新标准，上面三个属性名的grid-前缀已经删除
  // grid-column-gap和grid-row-gap写成column-gap和row-gap，grid-gap写成gap
  // row-gap: 10px;
  // column-gap: 10px;
  gap: 10px 10px;

  // grid-template-areas属性用于定义区域。
  // 划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。
  grid-template-areas:
    'a b c'
    'd e e'
    'g e e';
  // grid-template-areas:
  //   'a . a'
  //   'b . b'
  //   'c . c';

  // 这个顺序由grid-auto-flow属性决定，默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"。
  // grid-auto-flow: row dense;

  // justify-items属性设置单元格内容的水平位置（左中右），align-items属性设置单元格内容的垂直位置（上中下）。
  // place-items属性是align-items属性和justify-items属性的合并简写形式。

  // justify-content属性是整个内容区域在容器里面的水平位置（左中右），align-content属性是整个内容区域的垂直位置（上中下）。
  // place-content属性是align-content属性和justify-content属性的合并简写形式。

  grid-auto-rows: 50px;
}

.item-1 {
  // grid-column-start: 1;
  // grid-column-end: 3;
  // grid-row-start: 2;
  // grid-row-end: 4;
  // 设置网格线可以调整单元格位置
  // grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。
  /* 等同于上面代码 */
  // grid-column: 1 / 3;
  // grid-row: 1 / 2;

  // span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。
  // grid-column-start: span 2;

  // 斜杠以及后面的部分可以省略，默认跨越一个网格。
  // grid-column: 1 / span 2;
  // grid-row: 1 / span 2;
  // grid-column: 1;
  // grid-row: 1;

  // grid-area属性指定项目放在哪一个区域。
  // grid-area: e;

  // grid-area属性还可用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的合并简写形式，直接指定项目的位置。
  // grid-area: <row-start> / <column-start> / <row-end> / <column-end>;
  grid-area: 1 / 1 / 3 / 3;

  // justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。
  // align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。
  // place-self属性是align-self属性和justify-self属性的合并简写形式。
  // place-items: center;
}

.col-1 {
  background-color: #409eff;
}
.col-2 {
  background-color: #67c23a;
}
.col-3 {
  background-color: #e6a23c;
}
.col-4 {
  background-color: #f56c6c;
}
.col-5 {
  background-color: #909399;
}
.col-6 {
  background-color: #303133;
}
.col-7 {
  background-color: #dcdfe6;
}
.col-8 {
  background-color: #c0c4cc;
}
.col-9 {
  background-color: #606266;
}
</style>
