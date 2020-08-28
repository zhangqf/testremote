<style scoped>
.expand-row {
  margin-bottom: 16px;
}
.ui-rowBorder {
  border-top: 1px solid #eee;
  padding: 8px 0;
}
.background1 {
  background: #4d896a;
  color: #fff;
  padding: 4px;
  border-radius: 5px;
}
.background2 {
  background: #00bdf6;
  color: #fff;
  padding: 4px;
  border-radius: 5px;
}

.ivu-col.ivu-col-span-12 {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
</style>
<template>
  <div>
    <!-- <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">Job:</span>
        <span class="expand-value">{{ row.job }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Interest:</span>
        <span class="expand-value">{{ row.interest }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Birthday:</span>
        <span class="expand-value">{{ row.birthday }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="8">
        <span class="expand-key">Favorite book:</span>
        <span class="expand-value">《{{ row.book }}》</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Favorite movie:</span>
        <span class="expand-value">{{ row.movie }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">Favorite music:</span>
        <span class="expand-value">{{ row.music }}</span>
      </Col>
    </Row>-->

    <!-- <p v-for="item in row">{{item}}</p> -->
    <Row v-if="row==null">该用户暂无权限！</Row>
    <Row v-else v-for="item in row" class="ui-rowBorder" type="flex" justify="center">
      <Col span="12">
        <span class="expand-value" :class="{'background1':item.level==1}">{{ item.name }}</span>
      </Col>
      <Col span="12">
        <Row v-for="items in item.children" style="margin:8px 0">
          <Col>
            <span class="expand-value" :class="{'background2':items.level==2}">{{ items.name }}</span>
          </Col>
        </Row>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "expand",
  props: {
    row: Array,
  },
};
</script>