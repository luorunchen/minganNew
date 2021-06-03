<template>
  <div id="DanWeiGuanLi">
    <el-row :gutter="20">
      <el-col :span="4">
        <div class="danwei_left">
          <p class="titleP">行政区域</p>
          <el-tree
            :props="props"
            :load="loadNode"
            lazy
            @node-click="handleNodeClick"
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="danwei_right">
          <div class="one"></div>
          <div style="padding: 20px 0 0 40px">
            <el-form
              :inline="true"
              :model="formInline"
              class="demo-form-inline"
              size="mini"
            >
              <el-form-item label="内容">
                <el-input
                  v-model="formInline.user"
                  placeholder="查询内容"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="防火员">
                <el-input
                  v-model="formInline.user"
                  placeholder="防火员"
                ></el-input>
              </el-form-item>
              <el-form-item label="项目负责人">
                <el-input
                  v-model="formInline.user"
                  placeholder="项目负责人"
                ></el-input>
              </el-form-item> -->

              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="tabs">
              <el-table
                v-loading="loading"
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                height="650px"
                border
              >
                <el-table-column type="index" width="50"> </el-table-column>

                <el-table-column label="单位名称" width="120">
                  <template slot-scope="scope">{{ scope.row.name }}</template>
                </el-table-column>
                <el-table-column prop="location" label="所属区域">
                </el-table-column>
                <el-table-column
                  prop="master"
                  label="联系电话"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="fireman"
                  label="防火员"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="responsible"
                  label="项目负责人"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="巡查点数"
                  show-overflow-tooltip
                >
                </el-table-column>

                <el-table-column label="操作" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <div class="caozuo">
                      <span
                        @click="
                          (dialogVisible_search = true), open(scope.row.pid)
                        "
                        >查看</span
                      >
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[15, 20, 25, 30]"
            :page-size="15"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordCount"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <PublicPopUps ref="publicPopUps" :pagetype="pagetype" />
  </div>
</template>

<script>
import { getProvince, getRegionList, findRegion } from "@/api/index.js";
import PublicPopUps from "../../FireInternetOfThings/translate/publicPopUps";
export default {
  data() {
    return {
      pagetype: 9,
      loading: true,
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
        code: "code",
      },
      formInline: {
        user: "",
        region: "",
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableData: [],
      currentPage4: 1,
      recordCount: 0,
      current: 15,
      size: 1,
    };
  },
  mounted() {},
  methods: {
    open(pid) {
      this.$refs.publicPopUps.initOff();
      this.$refs.publicPopUps.echart_wapper(pid);
    },
    onSubmit() {
      findRegion(this.utils.userName, "", this.formInline.user).then((res) => {
        if (res.data.mess.length > 0) {
          this.tableData = res.data.mess;

          this.recordCount = res.data.recordCount;
        } else {
          this.$message.error("此关键词没有查询结果");
        }
      });
    },
    handleSizeChange(val) {
      this.current = val;
      this.getRegionListFun(val, this.size);
    },
    handleCurrentChange(val) {
      this.size = val;
      this.getRegionListFun(this.current, val);
    },

    handleNodeClick(data) {
      this.loading = true;
      getRegionList(this.utils.userName, 15, 1, data.code).then((res) => {
        this.tableData = res.data.mess;
        this.loading = false;
      });
    },
    getRegionListFun(p, s) {
      getRegionList(this.utils.userName, p, s, this.formInline.user).then(
        (res) => {
          this.tableData = res.data.mess;
          this.loading = false;
          this.recordCount = res.data.recordCount;
        }
      );
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        getProvince(this.utils.userName, "zTreeAsyncTest").then((res) => {
          let data = [];
          res.data.forEach((element) => {
            data.push({ name: element.name, code: element.id });
          });
          // console.log(data);
          return resolve(data);
        });
        this.getRegionListFun(15, 1);
      } else if (node.level === 4) {
        getProvince(this.utils.userName, "zTreeAsyncTest", node.data.code).then(
          (res) => {
            let arr = [];
            res.data.map((element, index) => {
              // console.log(element[index], index);
              arr.push({ name: element.name, code: element.id, leaf: true });
              return resolve(arr);
            });
          }
        );
      } else {
        getProvince(this.utils.userName, "zTreeAsyncTest", node.data.code).then(
          (res) => {
            let arr = [];
            res.data.map((element, index) => {
              // console.log(element[index], index);
              arr.push({ name: element.name, code: element.id });
              return resolve(arr);
            });
          }
        );
      }
    },
  },
  components: {
    PublicPopUps,
  },
};
</script>
<style lang='less' scoped>
#DanWeiGuanLi {
  .danwei_left {
    color: #000;
    height: 700px;
    // background: #bfa;
    margin: -20px 0 0 -20px;
    /deep/.el-tree {
      padding: 10px;
    }
    /deep/.el-tree-node__label {
      font-size: 16px;
    }
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
  }
  .caozuo {
    span {
      color: blue;
      cursor: pointer;
    }
  }
  .danwei_right {
    position: relative;
    .one {
      width: 20px;
      height: calc(86vh);
      background: #030542;
      margin-top: -20px;
      float: left;
    }
  }
  .block {
    position: absolute;
    bottom: 30px;
    right: 10px;
  }
}
</style>