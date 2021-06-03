<template>
  <div>
    <!-- 搜索内容弹窗 -->
    <div class="titleWapper">
      <el-dialog
        :visible.sync="dialogVisible"
        width="60%"
        :modal-append-to-body="false"
      >
        <div
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgb(4, 19, 54,1)"
        >
          <p class="title_name">
            {{ GetMapDataListName.name }}
          </p>

          <el-row :gutter="20">
            <el-col :span="8">
              <!-- 电气火灾展示数据 -->
              <template
                v-if="
                  this.$route.name == 'electricalFire' ||
                  this.$route.name == 'EmergencyManagement' ||
                  this.$route.name == 'PowerDetection' ||
                  this.$route.name == 'Panorama' ||
                  this.$route.name == 'FireManagement' ||
                  this.$route.name == 'FireInternetOfThings'
                "
              >
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    @click="
                      (innerVisible = true), see(item.devId, item.productNumber)
                    "
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <el-row :gutter="10">
                      <el-col :span="6">
                        <img
                          v-if="item.typeName != '正常' && item.typeName != ''"
                          src="../../../assets/images/yongdianlian_baojing@2x.png"
                          alt=""
                        />
                        <img
                          v-else-if="item.typeName == '正常'"
                          src="../../../assets/images/用电量@2x.png"
                          alt=""
                        />
                        <img
                          v-else-if="item.typeName == ''"
                          src="../../../assets/images/yongdianlian_lixian.png"
                          alt=""
                        />
                      </el-col>
                      <el-col :span="18"
                        ><ul>
                          <li>在线监测:{{ item.productNumber }}</li>
                          <li>更新时间:{{ item.heartbeatTime }}</li>
                          <li>
                            报警类型:
                            <span
                              style="color: #f830af"
                              v-if="item.typeName != '正常'"
                            >
                              {{ item.typeName }}</span
                            ><span style="color: #6dff64" v-else>
                              {{ item.typeName }}</span
                            >
                          </li>

                          <li>位置:{{ item.installLocation }}</li>
                        </ul></el-col
                      >
                    </el-row>
                  </div>
                </div>
              </template>
              <!-- 消防水展示数据 -->
              <template
                v-if="
                  this.$route.name == 'FireWaterSystem' ||
                  this.$route.name == 'GasBottlePressureDetection'
                "
              >
                <div class="scroll_wapper">
                  <!-- 液压表 -->
                  <div
                    class="left_one"
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <el-row :gutter="10">
                      <el-col :span="6">
                        <img
                          v-if="item.device_name == '消防水位'"
                          src="../../../assets/images/水位@2x.png"
                          alt=""
                        />
                        <img
                          v-else-if="item.typeName == '正常'"
                          src="../../../assets/images/shuiya_zhengchang.png"
                          alt=""
                        />
                        <img
                          v-else-if="item.typeName.indexOf('报警') > 0"
                          src="../../../assets/images/shuiya_baojing.png"
                          alt=""
                        />
                        <img
                          v-else
                          src="../../../assets/images/shuiya_lixian.png"
                          alt=""
                        />
                      </el-col>
                      <el-col :span="18">
                        <ul
                          v-if="item.device_name == '消防水位'"
                          @click="
                            (FireWaterSystemDialog = true),
                              shuiyaSee('shuiya', item.devId)
                          "
                        >
                          <li>{{ item.device_name }}</li>
                          <li>设备号:{{ item.productNumber }}</li>
                          <li>电池:V</li>
                          <li>
                            报警类型:
                            <span
                              style="color: #f830af"
                              v-if="item.typeName != '正常'"
                            >
                              {{ item.typeName }}</span
                            ><span style="color: #6dff64" v-else>
                              {{ item.typeName }}</span
                            >
                          </li>
                          <li>位置:{{ item.installLocation }}</li>
                        </ul>
                        <ul
                          v-else
                          @click="
                            (FireWaterSystemDialog = true),
                              shuiyaSee('yeya', item.devId)
                          "
                        >
                          <!-- <li>消防水位</li> -->
                          <li>{{ item.device_name }}</li>
                          <li>设备号:{{ item.productNumber }}</li>
                          <li>电池:V</li>
                          <li>
                            报警类型:
                            <span
                              style="color: #f830af"
                              v-if="item.typeName != '正常'"
                            >
                              {{ item.typeName }}</span
                            ><span style="color: #6dff64" v-else>
                              {{ item.typeName }}</span
                            >
                          </li>
                          <li>位置:{{ item.installLocation }}</li>
                        </ul></el-col
                      >
                    </el-row>
                  </div>
                  <!-- 水压表 -->
                  <!-- <div
                    class="left_one"
                   
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                    v-show="item.device_name != '消防水位'"
                  >
                  
                  </div> -->
                </div>
              </template>
              <!-- 火灾报警与燃气探测展示数据 -->
              <template
                v-if="
                  this.$route.name == 'FireAlarmSystem' ||
                  this.$route.name == 'GasDetector'
                "
              >
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    @click="
                      (FireAlarmSystemDialog = true),
                        FireAlarmSystem(item.devId, item.productNumber)
                    "
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <el-row :gutter="10">
                      <el-col :span="6">
                        <div v-if="$route.name == 'FireAlarmSystem'">
                          <img
                            v-if="item.typeName == '门磁低电量报警'"
                            src="../../../assets/images/menchi_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName == '正常'"
                            src="../../../assets/images/huo_zhangchang.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('火警') > 0"
                            src="../../../assets/images/huo_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('故障') > 0"
                            src="../../../assets/images/huo_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('报警') > 0"
                            src="../../../assets/images/huo_baojing.png"
                            alt=""
                          />
                          <img
                            v-else
                            src="../../../assets/images/huo_lixian.png"
                            alt=""
                          />
                        </div>
                        <div v-else>
                          <img
                            v-if="item.typeName == '门磁低电量报警'"
                            src="../../../assets/images/menchi_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName == '正常'"
                            src="../../../assets/images/ranqi_zhengchang.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('火警') > 0"
                            src="../../../assets/images/ranqi_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('故障') > 0"
                            src="../../../assets/images/ranqi_baojing.png"
                            alt=""
                          />
                          <img
                            v-else-if="item.typeName.indexOf('报警') > 0"
                            src="../../../assets/images/ranqi_baojing.png"
                            alt=""
                          />
                          <img
                            v-else
                            src="../../../assets/images/ranqi_lixian.png"
                            alt=""
                          />
                        </div>
                      </el-col>
                      <el-col :span="18">
                        <ul>
                          <li>设备号:{{ item.productNumber }}</li>
                          <li>更新:{{ item.heartbeatTime }}</li>
                          <li>
                            报警类型:
                            <span
                              :class="item.typeName == '正常' ? 'green' : 'red'"
                            >
                              {{ item.typeName }}</span
                            >
                          </li>
                          <li>位置:{{ item.installLocation }}</li>
                        </ul>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </template>
              <!-- 重点部位展示数据 -->
              <template v-if="this.$route.name == 'KeyParts'">
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    v-for="(item, index) in GetMapDataList.mess"
                    :key="index"
                  >
                    <el-row
                      :gutter="10"
                      v-if="item.productNumber.indexOf('_') != -1"
                    >
                      <el-col :span="6">
                        <img
                          src="../../../assets/images/视频@2x.png"
                          alt=""
                          style="margin: 15px 0 0 15px"
                        />
                      </el-col>
                      <el-col :span="18">
                        <ul>
                          <li>设备号:{{ item.devId }}</li>
                          <li>位置:{{ item.installLocation }}</li>
                          <li>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="
                                (KeyPartsDialog = true),
                                  getvideoFun(item.productNumber)
                              "
                              >查看视频</el-button
                            >
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10" v-else>
                      <el-col :span="6">
                        <img
                          src="../../../assets/images/nfc.jpg"
                          alt=""
                          style="margin: 15px 0 0 15px"
                        />
                      </el-col>
                      <el-col :span="18">
                        <ul>
                          <li>设备号:{{ item.devId }}</li>
                          <li>位置:{{ item.installLocation }}</li>
                          <li>
                            <el-button
                              type="primary"
                              size="mini"
                              @click="
                                (KeyPartsDialog = true), getvideoFun(item.devId)
                              "
                              >巡检记录</el-button
                            >
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </template>
              <!-- 智慧型独立烟感展示数据 -->
              <template
                v-if="
                  this.$route.name == 'SmartIndependentSmoke' ||
                  this.$route.name == 'IntelligentFireAlarm' ||
                  this.$route.name == 'FireExtinguisher'
                "
              >
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <el-row :gutter="10">
                      <el-col :span="6">
                        <!-- 烟感正常设备 -->
                        <img
                          v-if="
                            $route.name == 'SmartIndependentSmoke' &&
                            item.typeName == '正常'
                          "
                          src="../../../assets/images/yangan_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 门磁正常设备 -->
                        <img
                          v-if="item.dSid == 10 && item.typeName == '正常'"
                          src="../../../assets/images/menchi_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 水浸正常设备 -->
                        <img
                          v-if="item.dSid == 18 && item.typeName == '正常'"
                          src="../../../assets/images/shuijin_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 声光报警正常设备 -->
                        <img
                          v-if="item.dSid == 15 && item.typeName == '正常'"
                          src="../../../assets/images/shengguang_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 手动报警正常设备 -->
                        <img
                          v-if="item.dSid == 16 && item.typeName == '正常'"
                          src="../../../assets/images/shoudong_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 紧急报警正常设备 -->
                        <img
                          v-if="item.dSid == 19 && item.typeName == '正常'"
                          src="../../../assets/images/jinji_zhengchang.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 门磁报警设备 -->
                        <img
                          v-if="
                            item.dSid == 10 && item.typeName.indexOf('报警') > 0
                          "
                          src="../../../assets/images/menchi_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 水浸报警设备 -->
                        <img
                          v-if="
                            item.dSid == 18 && item.typeName.indexOf('报警') > 0
                          "
                          src="../../../assets/images/shuijin_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 声光报警设备 -->
                        <img
                          v-if="
                            item.dSid == 15 && item.typeName.indexOf('报警') > 0
                          "
                          src="../../../assets/images/shengguan_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 手动报警设备 -->
                        <img
                          v-if="
                            item.dSid == 16 && item.typeName.indexOf('报警') > 0
                          "
                          src="../../../assets/images/shoudong_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 紧急报警设备 -->
                        <img
                          v-if="
                            item.dSid == 19 && item.typeName.indexOf('报警') > 0
                          "
                          src="../../../assets/images/jinji_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 门磁离线设备 -->
                        <img
                          v-else-if="item.dSid == 10 && item.typeName == ''"
                          src="../../../assets/images/menci_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 水浸离线设备 -->
                        <img
                          v-else-if="item.dSid == 18 && item.typeName == ''"
                          src="../../../assets/images/shuijin_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 声光离线设备 -->
                        <img
                          v-else-if="item.dSid == 15 && item.typeName == ''"
                          src="../../../assets/images/shengguang_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 手动报警离线设备 -->
                        <img
                          v-else-if="item.dSid == 16 && item.typeName == ''"
                          src="../../../assets/images/shoudong_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!--紧急报警离线设备 -->
                        <img
                          v-else-if="item.dSid == 19 && item.typeName == ''"
                          src="../../../assets/images/jinji_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 灭火器设备 -->
                        <img
                          v-else-if="pagetype == '10'"
                          src="../../../assets/images/miehuoqi.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 烟感报警设备 -->
                        <img
                          v-else-if="
                            item.typeName.indexOf('报警') > 0 &&
                            $route.name == 'SmartIndependentSmoke'
                          "
                          src="../../../assets/images/yangan_baojing.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                        <!-- 烟感离线设备 -->
                        <img
                          v-else-if="
                            $route.name == 'SmartIndependentSmoke' &&
                            item.typeName == ''
                          "
                          src="../../../assets/images/yangan_lixian.png"
                          alt=""
                          width="84px"
                          height="84px"
                        />
                      </el-col>
                      <el-col :span="18">
                        <ul
                          @click="
                            (SmartIndependentSmokeDialog = true),
                              SmartIndependentSmokeSee(
                                item.devId,
                                item.productNumber
                              )
                          "
                        >
                          <li>设备号:{{ item.productNumber }}</li>
                          <li>更新:{{ item.heartbeatTime }}</li>
                          <li>
                            报警类型:
                            <span
                              :class="item.typeName == '正常' ? 'green' : 'red'"
                              >{{ item.typeName }}</span
                            >
                          </li>
                          <li>位置:{{ item.installLocation }}</li>
                          <li v-show="$route.name == 'IntelligentFireAlarm'">
                            设备类型:
                            <span v-if="item.dSid == 10">消防门磁</span>
                            <span v-if="item.dSid == 15">声光报警</span>
                            <span v-if="item.dSid == 16">手动报警</span>
                            <span v-if="item.dSid == 18">水浸报警</span>
                            <span v-if="item.dSid == 19">紧急报警</span>
                          </li>
                        </ul>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </template>

              <!-- 首页展示数据 -->
              <template v-if="this.$route.name == 'home'">
                <div class="scroll_wapper">
                  <div
                    class="left_one"
                    @click="
                      HomePageData(item.devId, item.productNumber, item.dSid)
                    "
                    v-for="(item, index) in getDeviceByPidList['mess']"
                    :key="index"
                  >
                    <!-- 烟感展示数据 -->
                    <template v-if="item.dSid == 2">
                      <el-row :gutter="10">
                        <el-col :span="6">
                          <!-- 烟感正常设备 -->
                          <img
                            v-if="item.dSid == 2 && item.typeName == '正常'"
                            src="../../../assets/images/yangan_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 门磁正常设备 -->
                          <img
                            v-if="item.dSid == 10 && item.typeName == '正常'"
                            src="../../../assets/images/menchi_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 水浸正常设备 -->
                          <img
                            v-if="item.dSid == 18 && item.typeName == '正常'"
                            src="../../../assets/images/shuijin_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 声光报警正常设备 -->
                          <img
                            v-if="item.dSid == 15 && item.typeName == '正常'"
                            src="../../../assets/images/shengguang_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 手动报警正常设备 -->
                          <img
                            v-if="item.dSid == 16 && item.typeName == '正常'"
                            src="../../../assets/images/shoudong_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 紧急报警正常设备 -->
                          <img
                            v-if="item.dSid == 19 && item.typeName == '正常'"
                            src="../../../assets/images/jinji_zhengchang.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 门磁报警设备 -->
                          <img
                            v-if="
                              item.dSid == 10 &&
                              item.typeName.indexOf('报警') > 0
                            "
                            src="../../../assets/images/menchi_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 水浸报警设备 -->
                          <img
                            v-if="
                              item.dSid == 18 &&
                              item.typeName.indexOf('报警') > 0
                            "
                            src="../../../assets/images/shuijin_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 声光报警设备 -->
                          <img
                            v-if="
                              item.dSid == 15 &&
                              item.typeName.indexOf('报警') > 0
                            "
                            src="../../../assets/images/shengguan_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 手动报警设备 -->
                          <img
                            v-if="
                              item.dSid == 16 &&
                              item.typeName.indexOf('报警') > 0
                            "
                            src="../../../assets/images/shoudong_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 紧急报警设备 -->
                          <img
                            v-if="
                              item.dSid == 19 &&
                              item.typeName.indexOf('报警') > 0
                            "
                            src="../../../assets/images/jinji_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 门磁离线设备 -->
                          <img
                            v-else-if="item.dSid == 10 && item.typeName == ''"
                            src="../../../assets/images/menci_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 水浸离线设备 -->
                          <img
                            v-else-if="item.dSid == 18 && item.typeName == ''"
                            src="../../../assets/images/shuijin_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 声光离线设备 -->
                          <img
                            v-else-if="item.dSid == 15 && item.typeName == ''"
                            src="../../../assets/images/shengguang_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 手动报警离线设备 -->
                          <img
                            v-else-if="item.dSid == 16 && item.typeName == ''"
                            src="../../../assets/images/shoudong_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!--紧急报警离线设备 -->
                          <img
                            v-else-if="item.dSid == 19 && item.typeName == ''"
                            src="../../../assets/images/jinji_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 灭火器设备 -->
                          <img
                            v-else-if="pagetype == '10'"
                            src="../../../assets/images/miehuoqi.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 烟感报警设备 -->
                          <img
                            v-else-if="
                              item.typeName.indexOf('报警') > 0 &&
                              item.dSid == 2
                            "
                            src="../../../assets/images/yangan_baojing.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                          <!-- 烟感离线设备 -->
                          <img
                            v-else-if="item.dSid == 2 && item.typeName == ''"
                            src="../../../assets/images/yangan_lixian.png"
                            alt=""
                            width="84px"
                            height="84px"
                          />
                        </el-col>
                        <el-col :span="18"
                          ><ul>
                            <li>在线监测:{{ item.productNumber }}</li>
                            <li>更新时间:{{ item.heartbeatTime }}</li>
                            <li>
                              报警类型:
                              <span
                                style="color: #f830af"
                                v-if="item.typeName != '正常'"
                              >
                                {{ item.typeName }}</span
                              ><span style="color: #6dff64" v-else>
                                {{ item.typeName }}</span
                              >
                            </li>

                            <li>位置:{{ item.installLocation }}</li>
                          </ul></el-col
                        >
                      </el-row>
                    </template>

                    <!-- 电气火灾展示数据 -->
                    <template v-if="item.dSid == 3 || item.dSid == 24">
                      <div class="scroll_wapper">
                        <el-row :gutter="10">
                          <el-col :span="6">
                            <img
                              v-if="
                                item.typeName != '正常' && item.typeName != ''
                              "
                              src="../../../assets/images/yongdianlian_baojing@2x.png"
                              alt=""
                            />
                            <img
                              v-else-if="item.typeName == '正常'"
                              src="../../../assets/images/用电量@2x.png"
                              alt=""
                            />
                            <img
                              v-else-if="item.typeName == ''"
                              src="../../../assets/images/yongdianlian_lixian.png"
                              alt=""
                            />
                          </el-col>
                          <el-col :span="18"
                            ><ul>
                              <li>在线监测:{{ item.productNumber }}</li>
                              <li>更新时间:{{ item.heartbeatTime }}</li>
                              <li>
                                报警类型:
                                <span
                                  style="color: #f830af"
                                  v-if="item.typeName != '正常'"
                                >
                                  {{ item.typeName }}</span
                                ><span style="color: #6dff64" v-else>
                                  {{ item.typeName }}</span
                                >
                              </li>

                              <li>位置:{{ item.installLocation }}</li>
                            </ul></el-col
                          >
                        </el-row>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </el-col>
            <el-col :span="16">
              <div class="right_wapper">
                <el-row
                  style="margin-bottom: 20px"
                  v-show="this.$route.name != 'KeyParts'"
                  :gutter="20"
                >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'police'
                          ? 'one equipmentColor'
                          : 'one'
                      "
                      @click="equipment('police', 0)"
                    >
                      <div class="one_item"></div>

                      <p>{{ GetMapDataListName.callPolice }}</p>
                      <p>报警设备</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'onLine'
                          ? 'two equipmentColor'
                          : 'two'
                      "
                      @click="equipment('onLine', 1)"
                    >
                      <div class="two_item"></div>
                      <p>{{ GetMapDataListName.onLine }}</p>
                      <p>在线设备</p>
                    </div></el-col
                  >
                  <el-col :span="8"
                    ><div
                      :class="
                        equipmentColor == 'offLine'
                          ? 'three equipmentColor'
                          : 'three'
                      "
                      @click="equipment('offLine', 2)"
                    >
                      <div class="three_item"></div>
                      <p>{{ GetMapDataListName.offLine }}</p>
                      <p>离线设备</p>
                    </div></el-col
                  >
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12"
                    ><div
                      class="four"
                      v-for="(item, index) in GetMapDataList.Company"
                      :key="index"
                    >
                      <p>单位简介</p>
                      <p>
                        <span style="color: #28d9ff">{{ item.MC }}</span
                        >位于
                        <span style="color: #28d9ff">{{ item.areaMC }}</span
                        >详细位置
                        <span style="color: #28d9ff">{{ item.address }}</span
                        >单位类型为
                        <span style="color: #28d9ff">其他</span>
                      </p>
                      <p>
                        单位消防安全负责人是<span style="color: #28d9ff">{{
                          item.firename
                        }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.firephone }}</span>
                        消防安全管理人是
                        <span style="color: #28d9ff">{{ item.resname }}</span>
                        联系电话是
                        <span style="color: #28d9ff">{{ item.resphone }}</span>
                      </p>
                      <p>
                        该单位使用属于
                        <span style="color: #28d9ff">{{ item.typeMC }}</span>
                      </p>
                    </div></el-col
                  >
                  <el-col :span="12">
                    <div
                      class="five"
                      v-if="
                        this.$route.path != '/FireInternetOfThings/KeyParts'
                      "
                    >
                      <p>一周内报警数</p>
                      <div class="echart_wapper"></div>
                    </div>
                    <div class="five" v-else>
                      <p>报警情况</p>

                      <ul>
                        <li>报警时间:无报警</li>
                        <li>报警设备:暂无</li>
                        <li>报警防区:暂无</li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
    </div>

    <!-- 内部弹窗 ->查看 -->
    <el-dialog
      width="60%"
      title="查看"
      :visible.sync="innerVisible"
      :modal-append-to-body="false"
    >
      <el-row
        ><el-button type="primary " @click="innerVisible_shebei = true"
          >设备设置</el-button
        >
        <el-button
          type="primary"
          @click="(innerVisible_lishi = true), Historical_alarm()"
          >历史报警</el-button
        >
      </el-row>
      <div class="shebeiWapper">
        <div class="shebeiInfo">
          <div class="one">
            <p class="titleP">设备信息</p>
            <ul v-for="(item, index) in ElecDataList.DevData" :key="index">
              <div
                v-if="item.typeName == '正常'"
                style="background: #13d61c"
                class="ulInfo"
              >
                设备正常/{{ item.status }}
              </div>
              <div
                v-if="item.typeName.indexOf('故障') >= 0"
                style="background: #eb8814"
                class="ulInfo"
              >
                设备故障/{{ item.status }}
              </div>
              <div
                v-if="item.typeName.indexOf('报警') >= 0"
                style="background: #d61313"
                class="ulInfo"
              >
                设备报警/{{ item.status }}
              </div>
              <li>
                设备编号: <span>{{ item.productNumber }}</span>
              </li>
              <li>
                设备状态: <span> {{ item.status }}</span>
              </li>
              <li>
                报警手机: <span>{{ item.master }}</span>
              </li>
              <li>
                报警信息:
                <span v-if="item.typeName != '正常'" style="color: red">{{
                  item.typeName
                }}</span>
                <span v-else style="color: blue">{{ item.typeName }}</span>
              </li>
              <li>
                最新数据:
                <span v-if="item.typeName != '正常'" style="color: red">{{
                  item.newestDate
                }}</span>
                <span v-else style="color: blue">{{ item.newestDate }}</span>
              </li>

              <li>
                保险单号:
                <span>
                  {{ item.policy == "0" ? "暂无保险单号" : item.policy }}</span
                >
              </li>
              <li>
                安装位置: <span>{{ item.installLocation }}</span>
              </li>
              <li>
                安装日期: <span>{{ item.regdate }}</span>
              </li>
              <li>
                开启流量:
                <span>{{ item.flow == "0" ? "否" : item.flow }}</span>
              </li>
            </ul>
          </div>
          <!-- <div class="two">
            <p class="titleP">操作记录</p>
          </div> -->
          <div class="two">
            <p class="titleP">填写处置情况</p>
            <el-input
              v-model="managementInput"
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 8 }"
              placeholder="请输入内容"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              style="margintop: 20px"
              @click="management"
              >提交</el-button
            >
          </div>
        </div>

        <div class="shebeiEcharts">
          <div
            class="one_echarts"
            style="margin-bottom: 20px; height: 220px"
            v-if="this.$route.name == 'PowerDetection'"
          >
            <p class="titleP">实时值</p>
            <el-row
              v-show="mwss5Status == true"
              v-for="(item, index) in getDeviceByDevIdList.mess5"
              :key="index"
            >
              <el-col :span="12">
                <div
                  style="
                    background: #1071e2;
                    height: 89px;
                    text-align: center;
                    border-radius: 0;
                    color: #fff;
                  "
                >
                  <img src="../../../assets/images/wenduji.png" alt="" />
                  <p>{{ item.date.value2 }}℃</p>
                </div>
                <ul>
                  <li>
                    灭火器状态:
                    <span
                      v-if="item.typeName.indexOf('灭火器') >= 0"
                      style="color: #d83333"
                    >
                      {{ item.typeName }}</span
                    >
                    <span v-else style="color: blue">正常</span>
                  </li>
                  <li>
                    报警时间:
                    <span
                      v-if="item.typeName.indexOf('灭火器') >= 0"
                      style="color: #d83333"
                    >
                      {{ item.alarmFaultDate }}</span
                    >
                    <span v-else style="color: blue">无</span>
                  </li>
                </ul>
              </el-col>
              <el-col :span="12">
                <div
                  style="
                    background: #1071e2;
                    height: 89px;
                    text-align: center;
                    border-radius: 0;
                    color: #fff;
                  "
                >
                  <img src="../../../assets/images/shuidi.png" alt="" />
                  <p>{{ item.date.value1 }}%</p>
                </div>
                <ul>
                  <li>
                    烟感状态:
                    <span
                      v-if="item.typeName.indexOf('烟雾') >= 0"
                      style="color: #d83333"
                    >
                      {{ item.typeName }}</span
                    >
                    <span v-else style="color: blue">正常</span>
                  </li>
                  <li>
                    报警时间:
                    <span
                      v-if="item.typeName.indexOf('烟雾') >= 0"
                      style="color: #d83333"
                    >
                      {{ item.alarmFaultDate }}</span
                    >
                    <span v-else style="color: blue">无</span>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-row v-show="mwss5Status == false">
              <el-col :span="12">
                <div
                  style="
                    background: #1071e2;
                    height: 89px;
                    text-align: center;
                    border-radius: 0;
                    color: #fff;
                  "
                >
                  <img src="../../../assets/images/wenduji.png" alt="" />
                  <p>0℃</p>
                </div>
                <ul>
                  <li>灭火器状态:正常</li>
                  <li>报警时间:无</li>
                </ul>
              </el-col>
              <el-col :span="12">
                <div
                  style="
                    background: #1071e2;
                    height: 89px;
                    text-align: center;
                    border-radius: 0;
                    color: #fff;
                  "
                >
                  <img src="../../../assets/images/shuidi.png" alt="" />
                  <p>0%</p>
                </div>
                <ul>
                  <li>烟感状态:正常</li>
                  <li>报警时间:无</li>
                </ul>
              </el-col>
            </el-row>
          </div>
          <template
            v-if="
              this.ElecDataList_typeName != '正常' &&
              this.$route.path != '/FireInternetOfThings/PowerDetection' &&
              this.$route.path != '/FireInternetOfThings/SmartIndependentSmoke'
            "
          >
            <el-row
              :gutter="20"
              v-for="(item, index) in getDeviceByDevIdList.mess5"
              :key="index"
            >
              <!-- 漏电-剩余 -->
              <template
                v-if="
                  item.info == '20' ||
                  item.info == '25' ||
                  item.info == '26' ||
                  item.info == '27' ||
                  (item.info == '0' && item.type.indexOf('漏电') != -1) ||
                  (item.info == '0' && item.type.indexOf('剩余') != -1)
                "
              >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <template>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.oneAlarm }}mA</p>
                              <p>{{ shengyu_loudian.oneDianLiu }}mA</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.twoAlarm }}mA</p>
                              <p>{{ shengyu_loudian.twoDianLiu }}mA</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.threeAlarm }}mA</p>
                              <p>{{ shengyu_loudian.threeDianLiu }}mA</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.fourAlarm }}mA</p>
                              <p>{{ shengyu_loudian.fourDianLiu }}mA</p>
                            </div>
                          </el-col>
                        </template>
                      </el-row>
                      <ul>
                        <li>
                          报警状态: <span>{{ item.type }}</span>
                        </li>
                        <li>
                          报警值:
                          <span>{{ item.leakageAlarmCurrentValue }}mA</span>
                        </li>
                        <li>
                          报警时间: <span>{{ item.regdate }}</span>
                        </li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.oneVolatage }}V</p>
                            <p>{{ shengyu_loudian.oneDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.oneTempera }}℃</p>
                            <p>{{ shengyu_loudian.oneWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.twoTempera }}℃</p>
                            <p>{{ shengyu_loudian.twoWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.threeTempera }}℃</p>
                            <p>{{ shengyu_loudian.threeWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.fourTempera }}℃</p>
                            <p>{{ shengyu_loudian.fourWenDu }}℃</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
              </template>
              <!-- 温度-A,B,C,N -->
              <template
                v-if="
                  item.info == '16' ||
                  item.info == '21' ||
                  item.info == '40' ||
                  item.info == '41' ||
                  (item.info == '0' && item.type.indexOf('N温度') != -1) ||
                  item.info == '19' ||
                  item.info == '35' ||
                  item.info == '34' ||
                  item.info == '24' ||
                  (item.info == '0' && item.type.indexOf('A温度') != -1) ||
                  item.info == '18' ||
                  item.info == '23' ||
                  item.info == '36' ||
                  item.info == '37' ||
                  (item.info == '0' && item.type.indexOf('B温度') != -1) ||
                  item.info == '17' ||
                  item.info == '22' ||
                  item.info == '38' ||
                  item.info == '39' ||
                  (item.info == '0' && item.type.indexOf('C温度') != -1)
                "
              >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <template>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.oneAlarm }}A</p>
                              <p>{{ shengyu_loudian.oneDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img
                                src="../../../assets/images/dianliu.png"
                                width="35px"
                                height="35px"
                              />
                              <p>{{ shengyu_loudian.twoAlarm }}A</p>
                              <p>{{ shengyu_loudian.twoDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.threeAlarm }}A</p>
                              <p>{{ shengyu_loudian.threeDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.fourAlarm }}A</p>
                              <p>{{ shengyu_loudian.fourDianLiu }}A</p>
                            </div>
                          </el-col>
                        </template>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >

                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.oneVolatage }}V</p>
                            <p>{{ shengyu_loudian.oneDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.oneTempera }}℃</p>
                            <p>{{ shengyu_loudian.oneWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.twoTempera }}℃</p>
                            <p>{{ shengyu_loudian.twoWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.threeTempera }}℃</p>
                            <p>{{ shengyu_loudian.threeWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.fourTempera }}℃</p>
                            <p>{{ shengyu_loudian.fourWenDu }}℃</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>
                          报警状态: <span>{{ item.type }}</span>
                        </li>
                        <li>
                          报警值:
                          <span v-if="item.type.indexOf('N温度') != -1"
                            >{{
                              item.temperatureAlarmNvalue == ""
                                ? item.noAlarmNTemperatureValue
                                : item.temperatureAlarmNvalue
                            }}℃
                          </span>
                          <span v-if="item.type.indexOf('A温度') != -1"
                            >{{
                              item.temperatureAlarmAvalue == ""
                                ? item.noAlarmNTemperatureValue
                                : item.temperatureAlarmAvalue
                            }}℃
                          </span>
                          <span v-if="item.type.indexOf('B温度') != -1"
                            >{{
                              item.temperatureAlarmBvalue == ""
                                ? item.noAlarmNTemperatureValue
                                : item.temperatureAlarmBvalue
                            }}℃
                          </span>
                          <span v-if="item.type.indexOf('C温度') != -1"
                            >{{
                              item.temperatureAlarmCvalue == ""
                                ? item.noAlarmNTemperatureValue
                                : item.temperatureAlarmCvalue
                            }}℃
                          </span>
                        </li>
                        <li>
                          报警时间: <span>{{ item.regdate }}</span>
                        </li>
                      </ul>
                    </div>
                  </div></el-col
                >
              </template>
              <!-- A电流-B电流-C电流 -->
              <template
                v-if="
                  item.info == '3' ||
                  item.info == '28' ||
                  item.info == '29' ||
                  (item.info == '0' && item.type.indexOf('A电流') != -1) ||
                  item.info == '2' ||
                  item.info == '30' ||
                  item.info == '31' ||
                  (item.info == '0' && item.type.indexOf('B电流') != -1) ||
                  item.info == '1' ||
                  item.info == '32' ||
                  item.info == '33' ||
                  (item.info == '0' && item.type.indexOf('C电流') != -1)
                "
              >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <template>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.oneAlarm }}A</p>
                              <p>{{ shengyu_loudian.oneDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.twoAlarm }}A</p>
                              <p>{{ shengyu_loudian.twoDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.threeAlarm }}A</p>
                              <p>{{ shengyu_loudian.threeDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.fourAlarm }}A</p>
                              <p>{{ shengyu_loudian.fourDianLiu }}A</p>
                            </div>
                          </el-col>
                        </template>
                      </el-row>
                      <ul>
                        <li>
                          报警状态: <span>{{ item.type }}</span>
                        </li>
                        <li>
                          报警值:
                          <span v-if="item.type.indexOf('A相电流') != -1"
                            >{{ item.currentAlarmAvalue }}A</span
                          >
                          <span v-if="item.type.indexOf('B相电流') != -1"
                            >{{ item.currentAlarmBvalue }}A</span
                          >
                          <span v-if="item.type.indexOf('C相电流') != -1"
                            >{{ item.currentAlarmCvalue }}A</span
                          >
                        </li>
                        <li>
                          报警时间: <span>{{ item.regdate }}</span>
                        </li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.oneVolatage }}V</p>
                            <p>{{ shengyu_loudian.oneDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.oneTempera }}℃</p>
                            <p>{{ shengyu_loudian.oneWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.twoTempera }}℃</p>
                            <p>{{ shengyu_loudian.twoWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.threeTempera }}℃</p>
                            <p>{{ shengyu_loudian.threeWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.fourTempera }}℃</p>
                            <p>{{ shengyu_loudian.fourWenDu }}℃</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
              </template>
              <!-- 电压-A,B,C -->
              <template
                v-if="
                  item.info == '5' ||
                  item.info == '8' ||
                  item.info == '11' ||
                  item.info == '14' ||
                  (item.info == '0' && item.type.indexOf('A电压') != -1) ||
                  item.info == '6' ||
                  item.info == '9' ||
                  item.info == '12' ||
                  item.info == '15' ||
                  (item.info == '0' && item.type.indexOf('B电压') != -1) ||
                  item.info == '4' ||
                  item.info == '7' ||
                  item.info == '10' ||
                  item.info == '13' ||
                  (item.info == '0' && item.type.indexOf('C电压') != -1)
                "
              >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <template>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.oneAlarm }}A</p>
                              <p>{{ shengyu_loudian.oneDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.twoAlarm }}A</p>
                              <p>{{ shengyu_loudian.twoDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div sclass="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.threeAlarm }}A</p>
                              <p>{{ shengyu_loudian.threeDianLiu }}A</p>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="imgWapper_img">
                              <img src="../../../assets/images/dianliu.png" />
                              <p>{{ shengyu_loudian.fourAlarm }}A</p>
                              <p>{{ shengyu_loudian.fourDianLiu }}A</p>
                            </div>
                          </el-col>
                        </template>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.oneVolatage }}V</p>
                            <p>{{ shengyu_loudian.oneDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianya.png" />
                            <p>{{ shengyu_loudian.twoVolatage }}V</p>
                            <p>{{ shengyu_loudian.twoDianYa }}V</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>
                          报警状态: <span>{{ item.type }}</span>
                        </li>
                        <li>
                          报警值:
                          <span v-if="item.type.indexOf('A电压') != -1"
                            >{{ item.noVoltageAlarmAValue }}A</span
                          >
                          <span v-if="item.type.indexOf('B电压') != -1"
                            >{{ item.noVoltageAlarmBValue }}A</span
                          >
                          <span v-if="item.type.indexOf('C电压') != -1"
                            >{{ item.noVoltageAlarmCValue }}A</span
                          >
                        </li>

                        <li>
                          报警时间: <span>{{ item.regdate }}</span>
                        </li>
                      </ul>
                    </div>
                  </div></el-col
                >
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <div class="imgWapper">
                      <el-row>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.oneTempera }}℃</p>
                            <p>{{ shengyu_loudian.oneWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.twoTempera }}℃</p>
                            <p>{{ shengyu_loudian.twoWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.threeTempera }}℃</p>
                            <p>{{ shengyu_loudian.threeWenDu }}℃</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/wenduji.png" />
                            <p>{{ shengyu_loudian.fourTempera }}℃</p>
                            <p>{{ shengyu_loudian.fourWenDu }}℃</p>
                          </div>
                        </el-col>
                      </el-row>
                      <ul>
                        <li>报警状态:无</li>
                        <li>报警值:无</li>
                        <li>报警时间:无</li>
                      </ul>
                    </div>
                  </div></el-col
                >
              </template>
            </el-row>
          </template>
          <template
            v-else-if="
              this.ElecDataList_typeName == '正常' &&
              this.$route.path != '/FireInternetOfThings/PowerDetection' &&
              this.$route.path != '/FireInternetOfThings/SmartIndependentSmoke'
            "
          >
            <el-row
              :gutter="20"
              v-for="(item, index) in getDeviceByDevIdList.mess2"
              :key="index"
            >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <div class="imgWapper">
                    <el-row>
                      <template>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianliu.png" />
                            <p>{{ shengyu_loudian.oneAlarm }}A</p>
                            <p>{{ shengyu_loudian.oneDianLiu }}A</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianliu.png" />
                            <p>{{ shengyu_loudian.twoAlarm }}A</p>
                            <p>{{ shengyu_loudian.twoDianLiu }}A</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianliu.png" />
                            <p>{{ shengyu_loudian.threeAlarm }}A</p>
                            <p>{{ shengyu_loudian.threeDianLiu }}A</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="imgWapper_img">
                            <img src="../../../assets/images/dianliu.png" />
                            <p>{{ shengyu_loudian.fourAlarm }}A</p>
                            <p>{{ shengyu_loudian.fourDianLiu }}A</p>
                          </div>
                        </el-col>
                      </template>
                    </el-row>
                    <ul>
                      <li>报警状态: 无</li>
                      <li>报警值:无</li>
                      <li>报警时间: 无</li>
                    </ul>
                  </div>
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <div class="imgWapper">
                    <el-row>
                      <el-col :span="8">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/dianya.png" />
                          <p>{{ shengyu_loudian.oneVolatage }}V</p>
                          <p>{{ shengyu_loudian.oneDianYa }}V</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/dianya.png" />
                          <p>{{ shengyu_loudian.twoVolatage }}V</p>
                          <p>{{ shengyu_loudian.twoDianYa }}V</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/dianya.png" />
                          <p>{{ shengyu_loudian.twoVolatage }}V</p>
                          <p>{{ shengyu_loudian.twoDianYa }}V</p>
                        </div>
                      </el-col>
                    </el-row>
                    <ul>
                      <li>报警状态:无</li>
                      <li>报警值:无</li>
                      <li>报警时间:无</li>
                    </ul>
                  </div>
                </div></el-col
              >
              <el-col :span="8"
                ><div class="grid-content bg-purple">
                  <div class="imgWapper">
                    <el-row>
                      <el-col :span="6">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/wenduji.png" />
                          <p>{{ shengyu_loudian.oneTempera }}℃</p>
                          <p>{{ shengyu_loudian.oneWenDu }}℃</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/wenduji.png" />
                          <p>{{ shengyu_loudian.twoTempera }}℃</p>
                          <p>{{ shengyu_loudian.twoWenDu }}℃</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/wenduji.png" />
                          <p>{{ shengyu_loudian.threeTempera }}℃</p>
                          <p>{{ shengyu_loudian.threeWenDu }}℃</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="imgWapper_img">
                          <img src="../../../assets/images/wenduji.png" />
                          <p>{{ shengyu_loudian.fourTempera }}℃</p>
                          <p>{{ shengyu_loudian.fourWenDu }}℃</p>
                        </div>
                      </el-col>
                    </el-row>
                    <ul>
                      <li>报警状态:无</li>
                      <li>报警值:无</li>
                      <li>报警时间:无</li>
                    </ul>
                  </div>
                </div></el-col
              >
            </el-row>
          </template>
          <!-- <template
            v-if="this.$route.path == '/FireInternetOfThings/PowerDetection'"
          >
          
          </template> -->

          <template
            v-if="this.$route.path == '/FireInternetOfThings/PowerDetection'"
          >
            <div class="one_echarts">
              <p class="titleP">湿度统计图</p>
              <div class="echarts_wapper_one_search"></div>
            </div>
            <div class="two_echarts">
              <p class="titleP">温度统计图</p>
              <div class="echarts_wapper_two_search"></div>
            </div>
            <div class="three_echarts" style="display: none">
              <p class="titleP">电压统计图</p>
              <div class="echarts_wapper_three_search"></div>
            </div>
            <div class="four_echarts" style="display: none">
              <p class="titleP">图片</p>
              <div class="echarts_wapper_four_search"></div>
            </div>
          </template>
          <template v-else>
            <div class="one_echarts" v-loading="one_echarts_loading">
              <p class="titleP">电流统计图</p>
              <div class="echarts_wapper_one_search"></div>
            </div>
            <div class="two_echarts" v-loading="one_echarts_loading">
              <p class="titleP">温度统计图</p>
              <div class="echarts_wapper_two_search"></div>
            </div>
            <div class="three_echarts" v-loading="one_echarts_loading">
              <p class="titleP">电压统计图</p>
              <div class="echarts_wapper_three_search"></div>
            </div>
            <div class="four_echarts">
              <p class="titleP">图片</p>
              <div class="echarts_wapper_four_search"></div>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>

    <!-- 内部弹窗->设置设备 -->
    <el-dialog
      width="50%"
      title="设备设置"
      :visible.sync="innerVisible_shebei"
      :modal-append-to-body="false"
    >
      <el-row>
        <el-col :span="6"
          ><div class="shezhi_left">
            <p class="titleP">设备信息</p>
            <ul v-for="(item, index) in ElecDataList.DevData" :key="index">
              <li>
                设备编号: <span> {{ item.productNumber }}</span>
              </li>
              <li>
                保险单号:
                <span>{{
                  item.policy == "0" ? "暂无保险单号" : item.policy
                }}</span>
              </li>
              <li>
                开启流量:
                <span>{{ item.flow == "0" ? "否" : "item.flow" }}</span>
              </li>
              <li>是否授权: <span>否</span></li>
            </ul>
          </div></el-col
        >
        <el-col :span="18"
          ><div class="shizhi_right">
            <div class="right_one">
              <p class="titleP">设备开关</p>
              <el-row
                :gutter="20"
                type="flex"
                class="row-bg"
                justify="space-around"
              >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('1')"
                    >远程断电</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('2')"
                    >远程开机</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('3')"
                    >远程关机</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('4')"
                    >开启蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('5')"
                    >关闭蜂鸣器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('6')"
                    >远程消音</el-button
                  ></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('7')"
                    >开启流量</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('8')"
                    >远程复位</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('9')">授权</el-button></el-col
                >
              </el-row>
              <el-row :gutter="20" class="row-bg">
                <el-col :span="8">
                  <el-button @click="shebeiBtn('10')"
                    >开启屏蔽器</el-button
                  ></el-col
                >
                <el-col :span="8">
                  <el-button @click="shebeiBtn('11')">下发保险单</el-button>
                </el-col>
                <el-col :span="8">
                  <el-input
                    placeholder="请输入保险单号"
                    v-model="baoxiandanhao"
                  ></el-input>
                </el-col>

                <!-- <el-col :span="8"> <el-button>远程关机</el-button></el-col> -->
              </el-row>
            </div>
            <div class="right_two">
              <p class="titleP">设置</p>
              <div class="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="阀值设置" class="tabs_one" name="first">
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>剩余电流/mA</p>
                        <el-input
                          v-model="fazhishezhi.SYDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.AXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>B相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.BXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>C相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.CXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>N相温度/℃</p>
                        <el-input
                          v-model="fazhishezhi.NXWD"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>A相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.AXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>B相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.BXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>C相电流/A</p>
                        <el-input
                          v-model="fazhishezhi.CXDL"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>A相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.AXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                      <el-col :span="12"
                        ><p>B相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.BXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input
                      ></el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="12">
                        <p>C相电压/V</p>
                        <el-input
                          v-model="fazhishezhi.CXDY"
                          size="mini"
                          placeholder="请输入内容"
                        ></el-input>
                      </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button size="mini">取消</el-button></el-col
                      >
                      <el-col :span="4"
                        ><el-button
                          type="primary"
                          size="mini"
                          @click="SetParameterApiFun"
                          >保存</el-button
                        ></el-col
                      >
                    </el-row>
                  </el-tab-pane>
                  <el-tab-pane
                    label="报警推送方式"
                    name="second"
                    style="text-align: center"
                  >
                    <p>设备状态</p>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox label="App">App</el-checkbox>
                      <el-checkbox label="短信">短信</el-checkbox>
                      <el-checkbox label="电话">电话</el-checkbox>
                    </el-checkbox-group>
                    <el-row type="flex" justify="center">
                      <el-col :span="4"
                        ><el-button size="mini">取消</el-button></el-col
                      >
                      <el-col :span="4"
                        ><el-button
                          type="primary"
                          size="mini"
                          @click="baojingtuisong"
                          >确定</el-button
                        ></el-col
                      >
                    </el-row></el-tab-pane
                  >
                  <el-tab-pane label="设备历史故障" name="third">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <el-date-picker
                          v-model="DeviceHistory"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          format="yyyy-MM-dd HH:mm:ss"
                        >
                        </el-date-picker>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory('故障')"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="日期" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="姓名" width="180">
                        </el-table-column>
                        <el-table-column prop="address" label="地址">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                  <el-tab-pane label="设置操作记录" name="fourth">
                    <el-form
                      size="mini"
                      :inline="true"
                      :model="formInline"
                      class="demo-form-inline"
                    >
                      <el-form-item label="日期:">
                        <div class="block">
                          <el-date-picker
                            v-model="DeviceHistory"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            format="yyyy-MM-dd HH:mm:ss"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="deviceHistory('操作')"
                          >查询</el-button
                        >
                      </el-form-item>
                    </el-form>
                    <template>
                      <el-table
                        :data="caozuojilv"
                        style="width: 100%"
                        height="400px"
                      >
                        <el-table-column type="index" width="50">
                        </el-table-column>
                        <el-table-column prop="user_name" label="用户账号">
                        </el-table-column>
                        <el-table-column prop="date" label="操作时间">
                        </el-table-column>
                        <el-table-column prop="info" label="操作内容">
                        </el-table-column>
                      </el-table>
                    </template>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div></div
        ></el-col>
      </el-row>
    </el-dialog>
    <!-- 内部弹窗->历史报警 -->
    <el-dialog
      title="历史报警"
      :modal-append-to-body="false"
      :visible.sync="innerVisible_lishi"
      width="50%"
    >
      <el-form
        size="mini"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="日期:">
          <el-col :span="24">
            <el-date-picker
              type="date"
              placeholder="时间"
              v-model="sizeForm.date1"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <!-- <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              v-model="sizeForm.date2"
              style="width: 100%"
            ></el-date-picker>
          </el-col> -->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit, Historical_alarm()"
            >查询</el-button
          >
          <!-- <el-button type="primary" @click="onSubmit">导出</el-button> -->
        </el-form-item>
      </el-form>
      <template>
        <el-table
          v-loading="Historical_alarm_list_loading"
          :data="Historical_alarm_list"
          style="width: 100%"
        >
          <el-table-column prop="type" label="报警名称"> </el-table-column>
          <el-table-column prop="regdate" label="报警时间"> </el-table-column>
          <el-table-column prop="leakageAlarmCurrentValue" label="报警值">
          </el-table-column>
        </el-table>
      </template>
    </el-dialog>

    <!-- 消防水液体弹窗 -->
    <el-dialog
      title="实时数据"
      :visible.sync="FireWaterSystemDialog"
      width="50%"
      :modal-append-to-body="false"
    >
      <div class="FireWaterSystemDialogWapper">
        <p class="title">{{ msg }}</p>
        <p class="title">{{ time }}</p>
        <!-- 图表容器 -->
        <div class="shuiya_echarts"></div>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-button type="primary" size="small">自诊断查询</el-button>
          </el-col>
          <el-col :span="6"
            ><el-button type="warning" size="small"
              >远程参数更新</el-button
            ></el-col
          >
          <el-col :span="6"
            ><el-button type="danger" size="small"
              >自主布撤防</el-button
            ></el-col
          >
          <el-col :span="6"
            ><el-button type="success" size="small">固件升级</el-button></el-col
          >
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <img
              src="../../../assets/images/four.png"
              height="100%"
              width="100%"
              alt=""
            />
          </el-col>

          <el-col :span="6">
            <img
              src="../../../assets/images/battery4.png"
              width="100%"
              height="100%"
              alt=""
            />
          </el-col>
        </el-row>
      </div>
      <div class="shuju_echarts">
        <p>设备最近数据分析</p>
        <div class="shuju_echarts_wapper"></div>
      </div>
    </el-dialog>

    <!-- 火灾报警与燃气弹窗共用弹窗 -->
    <el-dialog
      title="设备信息"
      :visible.sync="FireAlarmSystemDialog"
      width="50%"
      :modal-append-to-body="false"
    >
      <div class="FireAlarmSystemDialog">
        <div class="one">
          <p>设备详情</p>
          <ul
            v-if="ElecDataList_type_List_DevInfo.dVName != undefined"
            v-loading="FireAlarmSystem_loading"
          >
            <li>
              <span> 设备厂商:</span>{{ ElecDataList_type_List_DevInfo.dVName }}
            </li>
            <li>
              <span> 设备类型:</span>{{ ElecDataList_type_List_DevInfo.dSName }}
            </li>
            <li>
              <span> 安装位置:</span
              >{{ ElecDataList_type_List_DevInfo.installLocation }}
            </li>

            <li>
              <span> 产品编号:</span
              >{{ ElecDataList_type_List_DevInfo.productNumber }}
            </li>
          </ul>
          <ul
            v-loading="FireAlarmSystem_loading"
            v-show="ElecDataList_type_List_DevInfo.dVName == undefined"
            v-for="(item, index) in ElecDataList_type_List.Data"
            :key="index"
          >
            <li><span> 所在地址:</span>{{ item.name }}</li>
            <li><span> 所在位置:</span>{{ item.installLocation }}</li>
            <li><span> 时间:</span>{{ item.heartbeatTime }}</li>
            <!-- <li>注册时间</li> -->
            <li><span>设备编号:</span> {{ item.productNumber }}</li>
          </ul>
        </div>
        <div class="two">
          <p>历史报警</p>
          <el-form
            size="mini"
            :inline="true"
            :model="formInline"
            class="demo-form-inline formList"
          >
            <!-- <el-form-item label="日期:">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="开始时间"
                  v-model="sizeForm.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="结束时间"
                  v-model="sizeForm.date2"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item> -->

            <el-form-item>
              <!-- <el-button type="primary" @click="onSubmit">查询</el-button> -->
              <el-button
                type="primary"
                @click="exportElx"
                v-if="$route.name != 'GasDetector'"
                >数据导出</el-button
              >
            </el-form-item>
            <template>
              <el-table
                v-loading="FireAlarmSystem_loading"
                v-if="ElecDataList_type_List_DevInfo.dVName != undefined"
                height="300"
                :data="ElecDataList_type_List.mess12.reverse()"
                style="width: 100%"
                border
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column
                  prop="facilitiesType"
                  label="设备类型"
                  width="180"
                >
                </el-table-column>
                <el-table-column prop="descr" label="设备详情" width="180">
                </el-table-column>
                <el-table-column prop="device_name" label="设备标识">
                </el-table-column>
                <el-table-column prop="valStr" label="报警类型">
                </el-table-column>
                <el-table-column prop="time" label="报警时间" sortable>
                </el-table-column>
              </el-table>
              <el-table
                v-else
                v-loading="FireAlarmSystem_loading"
                height="300"
                :data="ElecDataList_type_List.DevData"
                style="width: 100%"
                border
              >
                <el-table-column type="index" width="50"> </el-table-column>
                <el-table-column prop="typeName" label="报警类型" width="180">
                </el-table-column>
                <el-table-column prop="name" label="所属单位" width="180">
                </el-table-column>
                <el-table-column prop="installLocation" label="设备位置">
                </el-table-column>
                <!-- <el-table-column prop="alarmType" label="报警类型">
                </el-table-column> -->
                <el-table-column prop="alarmFaultDate" label="报警时间">
                </el-table-column>
              </el-table>
            </template>
          </el-form>
        </div>

        <div class="two">
          <p>设备事件</p>
          <el-table
            v-loading="FireAlarmSystem_loading"
            height="200"
            :data="getBluebirdevent_List"
            style="width: 100%"
            border
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="d_type" label="设备类型" width="180">
            </el-table-column>
            <el-table-column prop="desc" label="设备详情" width="180">
            </el-table-column>
            <el-table-column prop="dstr" label="设备标识"> </el-table-column>
            <!-- <el-table-column prop="alarmType" label="报警类型">
                </el-table-column> -->
            <el-table-column prop="alarmType" label="事件类型">
            </el-table-column>
            <el-table-column prop="date" label="事件时间"> </el-table-column>
          </el-table>
        </div>
        <!-- <div class="three">
          <p>设备事件</p>
        </div> -->
      </div>
    </el-dialog>

    <!-- 重点部位弹窗 -->
    <el-dialog
      :title="getNFCInspectionByDevIdList.length > 0 ? '巡检记录' : '查看视频'"
      :visible.sync="KeyPartsDialog"
      width="50%"
      :modal-append-to-body="false"
    >
      <div id="ezuikitTalkData"></div>

      <template v-if="this.getNFCInspectionByDevIdList.length > 0">
        <el-table :data="getNFCInspectionByDevIdList[0].mess">
          <el-table-column prop="productNumber" label="设备位置">
          </el-table-column>
          <el-table-column prop="device_name" label="设备名称">
          </el-table-column>
          <el-table-column prop="date" label="安装时间"> </el-table-column>
          <el-table-column prop="isMess" label="设备状态"> </el-table-column>
        </el-table>
      </template>
    </el-dialog>
    <!-- 独立烟感弹窗 -->
    <el-dialog
      title="设备信息"
      :visible.sync="SmartIndependentSmokeDialog"
      width="60%"
      :modal-append-to-body="false"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="SmartIndependentSmoke">
            <div class="two">
              <p class="titleP">填写处置情况</p>
              <el-input
                v-model="managementInput"
                type="textarea"
                :autosize="{ minRows: 7, maxRows: 8 }"
                placeholder="请输入内容"
              ></el-input>
              <el-button
                type="primary"
                size="mini"
                style="margintop: 20px"
                @click="management"
                >提交</el-button
              >
            </div>
          </div>
        </el-col>
        <el-col :span="18" class="SmartIndependentSmoke_right_wapper">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="rihgt_one">
                <p class="titleP">设备信息</p>
                <ul
                  v-for="(item, index) in ElecDataList_noIndexOf.DevData"
                  :key="index"
                >
                  <li><span>设备编号:</span> {{ item.productNumber }}</li>
                  <li v-if="item.regdate == null || item.regdate == undefined">
                    <span> 时间:</span>{{ item.heartbeatTime }}
                  </li>
                  <li v-else><span> 时间:</span>{{ item.regdate }}</li>
                  <li><span> 所在地址:</span>{{ item.installLocation }}</li>
                  <li><span>所在位置:</span> {{ item.name }}</li>
                </ul>
              </div>
            </el-col>
            <el-col :span="16">
              <div
                class="right_two"
                v-for="(item, index) in ElecDataList_noIndexOf.mess6"
                :key="index"
              >
                <el-row>
                  <el-col :span="12">
                    <img
                      v-if="item.rssi == 1"
                      src="../../../assets/images/one.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.rssi == 2"
                      src="../../../assets/images/two.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.rssi == 3"
                      src="../../../assets/images/three.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.rssi == 4"
                      src="../../../assets/images/four.png"
                      alt=""
                    />
                    <img v-else src="../../../assets/images/ling.png" alt="" />
                  </el-col>
                  <el-col :span="12">
                    <img
                      v-if="item.voltage == 1"
                      src="../../../assets/images/battery1.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.voltage == 2"
                      src="../../../assets/images/battery2.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.voltage == 3"
                      src="../../../assets/images/battery3.png"
                      alt=""
                    />
                    <img
                      v-else-if="item.voltage == 4"
                      src="../../../assets/images/battery4.png"
                      alt=""
                    />
                    <img
                      v-else
                      src="../../../assets/images/battery0.png"
                      alt=""
                    />
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <div class="SmartIndependentSmoke_echars_one" v-show="false">
            <p class="titleP">设备心跳/温度统计图</p>
            <div class="SmartIndependentSmoke_echars_one_wapper"></div>
          </div>
          <div class="lishibaojing">
            <p class="titleP">历史报警</p>
            <el-form
              size="mini"
              :inline="true"
              :model="formInline"
              class="demo-form-inline formList"
            >
              <!-- <el-form-item label="日期:">
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="开始时间"
                    v-model="sizeForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="结束时间"
                    v-model="sizeForm.date2"
                    style="width: 100%"
                  ></el-date-picker>
                </el-col>
              </el-form-item> -->

              <!-- <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item> -->
              <template>
                <el-table
                  height="300px"
                  :data="ElecDataList_noIndexOf.Data"
                  style="width: 100%"
                >
                  <el-table-column type="index" width="50"> </el-table-column>
                  <el-table-column prop="typeName" label="报警类型">
                  </el-table-column>
                  <el-table-column prop="alarmFaultDate" label="报警时间">
                  </el-table-column>
                </el-table>
              </template>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetMapData,
  getDeviceByPid,
  ElecData,
  WebeditFileimageServlet,
  ReadParameterApi,
  getDeviceByDevId,
  ElectricDeviceDate,
  resetclose,
  putMessToDevice,
  putMessToDeviceOn,
  resetclosefuwei,
  insertClouddog,
  updateShutdown,
  UpdateDevicePush,
  ElecData_type,
  getvideo,
  getHisDeviceData,
  fracture,
  getHistDeviceAlarm,
  getUserInfo,
  getHistoryFault,
  getBluebirdevent,
  getNFCInspectionByDevId,
  SetParameterApi,
} from "@/api/index.js";

import EZUIKit from "ezuikit-js";
export default {
  props: ["pagetype"],
  data() {
    return {
      getNFCInspectionByDevIdList: [],
      FireAlarmSystem_loading: false,
      getBluebirdevent_List: [],
      caozuojilv: [],
      Historical_alarm_list: [],
      Historical_alarm_list_loading: false,
      ElecDataList_noIndexOf: [],
      one_echarts_loading: false,
      mwss5Status: true,
      DeviceHistory: "",
      ElecDataList_type_List: [],
      fazhishezhi: {
        SYDL: "",
        AXDL: "",
        BXDL: "",
        CXDL: "",
        AXWD: "",
        BXWD: "",
        CXWD: "",
        NXWD: "",
        AXDY: "",
        BXDY: "",
        CXDY: "",
      },
      ElecDataList_type_List_DevInfo: {},
      baoxiandanhao: "",
      ElecDataList_images: [],
      ElecDataList: "",
      getDeviceByPidList: "",
      loading: true,
      GetMapDataList: "",
      GetMapDataListName: {
        name: "",
        callPolice: "",
        onLine: "",
        offLine: "",
      },
      managementInput: "",
      //独立烟感
      SmartIndependentSmokeDialog: false,
      //重点部位
      KeyPartsDialog: false,
      // 火灾报警
      FireAlarmSystemDialog: false,
      msg: "",
      FireWaterSystemDialog: false,
      equipmentColor: "onLine",
      sizeForm: {
        date2: "",
        date1: "",
      },

      innerVisible_lishi: false,
      checkList: [],
      activeName: "second",
      input: "",
      innerVisible: false,
      dialogVisible: false,
      onlineVisible: false,
      innerVisible_shebei: false,
      offlineVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      getDeviceByDevIdList: "",
      shengyu_loudian: "",
      ElecDataList_typeName: "",
      currentPage4: 1,
      tableData: [],

      time: "",
    };
  },
  mounted() {
    // //console.log(this.SElec_DetailElecDevice_List, 4564565);
    // undefined;
  },

  methods: {
    //首页地图点类型识别
    HomePageData(devID, productNumber, dSid) {
      // console.log(devID, productNumber, dSid, 666666);
      this.openTypeFun(devID, productNumber, dSid.toString());
    },
    //首页报警信息打开的方法
    openTypeFun(devID, imei, type) {
      switch (type) {
        //烟感
        case "2":
          this.SmartIndependentSmokeSee(devID, imei);
          break;
        // 消防水
        case "4":
          this.shuiyaSee("yeya", devID);
          break;
        //电气火灾
        case "3":
          this.see(devID, imei);
          break;
        case "24":
          this.see(devID, imei);
          break;
        case "10":
          this.SmartIndependentSmokeSee(devID, imei);
          break;
        case "5":
          this.FireAlarmSystem(devID, imei);
          break;
      }
      //独立烟感
      // this.SmartIndependentSmokeSee();
      // //火灾报警
      // this.FireAlarmSystem();
      // //消防水
      // this.shuiyaSee();
    },
    //导出elc表格
    exportElx() {
      console.log(this.ElecDataList_type_List_DevInfo, 987987987);
      window.open(
        `http://psy119.cn/earlyWarn/admin/device/excelAlarmValue.action?imei=${this.ElecDataList_type_List_DevInfo.productNumber}`
      );
    },
    //历史报警
    Historical_alarm() {
      this.Historical_alarm_list_loading = true;
      const time = new Date();
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      let now = year + "-" + month + "-" + day;
      if (this.sizeForm.date1 != "") {
        now = this.sizeForm.date1;
      }
      // console.log(this.sizeForm.date1, 987987);
      getHistDeviceAlarm(this.productNumber, now).then(
        (res) => {
          this.Historical_alarm_list_loading = false;
          if (res.data == "") {
            return this.$message.warning("暂无历史数据");
          }
          this.Historical_alarm_list = res.data.DevData;
        },
        () => {
          this.$message.error("请稍后重试或联系管理员");
        }
      );
    },
    initOff() {
      this.dialogVisible = true;
    },
    //萤石云视频
    getvideoFun(productNumber) {
      //这是视频展示数据

      this.$nextTick(() => {
        const item = document.getElementById("ezuikitTalkData");

        //动态删除多出的子元素
        while (item.firstChild) {
          item.removeChild(item.firstChild);
        }
      });
      if (productNumber.toString().indexOf("_") != -1) {
        this.getNFCInspectionByDevIdList = [];

        getvideo().then((res) => {
          const deviceSerial = productNumber.split("_")[0];
          const deviceSerial2 = productNumber.split("_")[1];

          var ezuikitTalkData = {
            accessToken: global.accessToken, // 应用accessToken
            ezopen:
              "ezopen://" +
              deviceSerial2 +
              "@open.ys7.com/" +
              deviceSerial +
              "/1.hd.live", // 包含设备信息的ezopen协议
            decoderPath: "./", // 当前页面与插件主文件ezuiit-talk相对路径
          };
          new EZUIKit.EZUIKitPlayer({
            autoplay: true,
            id: "ezuikitTalkData",
            accessToken: res.data.accessToken,
            url: ezuikitTalkData.ezopen, // 这里的url可以是直播地址.live  ，也可以是回放地址.rec 或 .cloud.rec
            template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
            // 视频上方头部控件
            header: ["capturePicture", "save"], // 如果templete参数不为simple,该字段将被覆盖
            plugin: ["talk"], // 加载插件，talk-对讲
            // 视频下方底部控件
            footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
            audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
            openSoundCallBack: (data) => console.log("开启声音回调", data),
            closeSoundCallBack: (data) => console.log("关闭声音回调", data),
            startSaveCallBack: (data) => console.log("开始录像回调", data),
            stopSaveCallBack: (data) => console.log("录像回调", data),
            capturePictureCallBack: (data) => console.log("截图成功回调", data),
            fullScreenCallBack: (data) => console.log("全屏回调", data),
            getOSDTimeCallBack: (data) => console.log("获取OSDTime回调", data),
            // width: 100, //如果指定了width、height则以这里为准
            height: 600, //如果没指定宽高，则以容器video-container为准
          });
          // getvideo_ycy(res.data.accessToken, deviceSerial).then((red) => {
          //   // this.GetMapDataList.mess
          // });
          this.$forceUpdate();
        });
      } else {
        getNFCInspectionByDevId(productNumber).then((res) => {
          console.log(res.data);
          this.getNFCInspectionByDevIdList = res.data.list;
          // console.log(this.getNFCInspectionByDevIdList);
        });
      }
    },
    //设备历史
    deviceHistory(type) {
      if (type == "故障") {
        getHistoryFault(
          this.ElecDataList.DevData[0].productNumber,
          this.DeviceHistory[0],
          this.DeviceHistory[1]
        ).then((res) => {
          if (res.data.length <= 0) {
            return this.$message.error("暂无历史数据");
          }
        });
      } else {
        getUserInfo(
          "",
          "",
          this.productNumber,
          this.DeviceHistory[0],
          this.DeviceHistory[1]
        ).then(
          (res) => {
            this.caozuojilv = res.data;
            if (res.data.length == 0) {
              return this.$message.error("暂无历史数据");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
      //console.log(this.DeviceHistory);
    },
    //报警推送
    baojingtuisong() {
      //console.log(this.checkList);
      let app = 0;
      let sms = 0;
      let phone = 0;
      // if(this.checklist.length==3){
      //   app = 1
      // }
      // if(this.checklist.length==2){
      //   sms = 1
      // }
      this.checkList.forEach((index, element) => {
        //console.log(index, element);
        if (index === "短信") {
          sms = 1;
        }
        if (index === "电话") {
          phone = 1;
        }
        if (index === "App") {
          app = 1;
        }
      });
      UpdateDevicePush(
        "undefined",
        app,
        this.utils.userName,
        sms,
        this.ElecDataList.DevData[0].productNumber,
        phone
      ).then((res) => {
        this.$message.success("修改成功");
      });
    },
    SetParameterApiFun() {
      SetParameterApi(
        this.ElecDataList.DevData[0].productNumber,
        this.fazhishezhi.SYDL,
        this.fazhishezhi.AXWD,
        this.fazhishezhi.BXWD,
        this.fazhishezhi.CXWD,
        this.fazhishezhi.NXWD,
        this.fazhishezhi.AXDL,
        this.fazhishezhi.BXDL,
        this.fazhishezhi.CXDL,
        this.fazhishezhi.AXDY,
        this.fazhishezhi.BXDY,
        this.fazhishezhi.CXDY
      ).then((res) => {
        if (res.data.status == 1) {
          this.$message.success("设置成功");
        } else {
          this.$message.error("设置失败");
        }
      });
    },
    //提交处置情况
    management() {
      if (this.ElecDataList.DevData[0].aFid == "") {
        return this.$message.warning("设备正常,无需解除");
      }
      if (this.managementInput == "") {
        return this.$message.error("请填写处置信息");
      }
      console.log(this.ElecDataList.DevData[0]);
      WebeditFileimageServlet(
        this.utils.userName + "," + this.ElecDataList.DevData[0].aFid,
        this.managementInput
      ).then((res) => {
        if (res.data.list[0].status == true) {
          this.innerVisible = false;
          return this.$message.success("报警解除成功");
        }
      });
    },
    //独立烟感
    SmartIndependentSmokeSee(devId, imei) {
      this.SmartIndependentSmokeDialog = true;
      if (this.$route.path === "/FireInternetOfThings/IntelligentFireAlarm") {
        ElecData_type(devId, 6).then((res) => {
          this.ElecDataList_noIndexOf = res.data;
        });
      } else {
        ElecData_type(devId, this.pagetype).then((res) => {
          this.ElecDataList_noIndexOf = res.data;
        });
      }

      getHisDeviceData(imei).then((res) => {
        let rouselt = res.data.list[0].mess;
        let rssi = [];
        let create_time = [];
        let temperature = [];
        rouselt.forEach((element, index) => {
          //console.log(element.rssi);
          rssi.push(element.rssi);
          create_time.push(element.create_time);
          temperature.push(element.temperature);
        });

        this.$nextTick(() => {
          let shui_echart = this.$echarts.init(
            document.querySelector(".SmartIndependentSmoke_echars_one_wapper")
          );
          shui_echart.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["信号强度", "温度"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: create_time.reverse(),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "信号强度",
                type: "line",

                data: rssi.reverse(),
              },
              {
                name: "温度",
                type: "line",

                data: temperature.reverse(),
              },
            ],
          });
        });
      });
    },
    // 水压表
    shuiyaSee(data, devId) {
      this.FireWaterSystemDialog = true;
      // this.seeInfo = data;
      let max;
      let name;

      ElecData_type(devId, this.pagetype).then((res) => {
        this.msg = res.data.DevData[0].typeName;
        this.time = res.data.DevData[0].alarmFaultDate;
        this.$nextTick(() => {
          let shui_echart = this.$echarts.init(
            document.querySelector(".shuiya_echarts")
          );
          if (data == "yeya") {
            max = 1000;
            name = "kpa";

            shui_echart.setOption({
              // tooltip: {
              //   formatter: "{a} <br/>{b} : {c}m",
              // },

              series: [
                {
                  // name: "业务指标",
                  type: "gauge",
                  min: 0,
                  max: max,
                  detail: { formatter: `{value}${name}` },
                  axisLine: {
                    // 坐标轴线
                    lineStyle: {
                      // 属性lineStyle控制线条样式
                      color: [
                        [0.2, "#91c7ae"],
                        [0.8, "#63869e"],
                        [1, "#c23531"],
                      ],
                    },
                  },
                  pointer: {
                    itemStyle: {
                      color: "auto",
                    },
                  },
                  data: [{ value: res.data.DevData[0].latitude }],
                },
              ],
            });
          } else {
            shui_echart.setOption({
              series: [
                {
                  type: "liquidFill",
                  radius: "200px",
                  data: [res.data.DevData[0].latitude * 0.01 * 1],
                  label: {
                    normal: {
                      color: "#fff",
                      // insideColor: "transparent",
                      textStyle: {
                        fontSize: 30,
                        fontWeight: "bold",
                      },
                      formatter: `${res.data.DevData[0].latitude * 1}m`,
                    },
                  },
                  color: [
                    {
                      type: "linear",
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 1,
                          color: ["#6a7feb"], // 0% 处的颜色
                        },
                        {
                          offset: 0,
                          color: ["#27e5f1"], // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    },
                  ],
                  outline: {
                    show: true,
                    borderDistance: 5,
                    itemStyle: {
                      borderColor: "rgba(67,209,100,1)",
                      borderWidth: 0,
                    },
                  },
                },
              ],
            });
          }
        });

        // //console.log(option2);

        // var option2 = (Math.random() * 1000).toFixed(2) - 0;
        // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
        // //console.log((Math.random() * 100).toFixed(2) - 0);
        // shui_echart.setOption(option, true);
      });
      this.$nextTick(() => {
        let one_echart_left = this.$echarts.init(
          document.querySelector(".shuju_echarts_wapper")
        );
        one_echart_left.setOption({
          xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          yAxis: {
            type: "value",
            axisLabel: {
              show: true,
              textStyle: {
                color: "#000",
              },
            },
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              smooth: true,
              itemStyle: {
                normal: {
                  lineStyle: {
                    color: "red",
                  },
                },
              },
            },
          ],
        });
      });
    },
    equipment(data, num) {
      this.equipmentColor = data;
      //console.log(this.pagetype);
      getDeviceByPid(
        this.devicepidData,
        num,
        this.pagetype,
        this.utils.userName
      ).then((res) => {
        // console.lotg(res.data, 3121);
        this.getDeviceByPidList = res.data;
      });
    },
    // 外部弹窗echart
    echart_wapper(data) {
      this.loading = true;

      // //console.log(data)
      // const type = 2;
      this.equipmentColor = "onLine";
      this.devicepidData = data;
      GetMapData(data, this.pagetype, this.utils.userName).then((res) => {
        // //console.log(res);
        this.GetMapDataList = res.data;
        //获取地图点
        let map;
        if (res.data.Company[0].MLng > 60) {
          map = [res.data.Company[0].MLng * 1, res.data.Company[0].MLat * 1];
        } else {
          map = [res.data.Company[0].MLat * 1, res.data.Company[0].MLng * 1];
        }

        // console.log(map, "我是,ap");
        this.$store.commit("set_map", map);

        //重点部位模块不需要Echart图表
        if (this.$route.path == "/FireInternetOfThings/KeyParts") {
          // this.GetMapDataList = res.data;
          this.GetMapDataListName.name = this.GetMapDataList.Company[0].MC;
          // this.GetMapDataListName.callPolice = this.GetMapDataList.Company[0].;
          // this.GetMapDataListName.onLine = this.GetMapDataList.Company[0].;
          // this.GetMapDataListName.offLine = this.GetMapDataList.Company[0].;
        } else {
          this.GetMapDataListName.name = this.GetMapDataList.Company[0].MC;
          this.GetMapDataListName.callPolice = this.GetMapDataList.devMess[0];
          this.GetMapDataListName.onLine = this.GetMapDataList.devMess[1];
          this.GetMapDataListName.offLine = this.GetMapDataList.devMess[2];

          let name = [];
          let data = [];
          // //console.log(res.data.Diagram, 333);
          res.data.Diagram.forEach((element) => {
            name.push(element.date);
            data.push(element.num);
          });
          this.$nextTick(() => {
            let one_echart_left = this.$echarts.init(
              document.querySelector(".echart_wapper")
            );
            one_echart_left.setOption({
              xAxis: {
                type: "category",
                data: name,
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "cross",
                  label: {
                    backgroundColor: "#6a7985",
                  },
                },
              },
              yAxis: {
                type: "value",
                axisLabel: {
                  show: true,
                  textStyle: {
                    color: "#fff",
                  },
                },
              },
              series: [
                {
                  data: data,
                  type: "line",
                  smooth: true,
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        color: "red",
                      },
                    },
                  },
                },
              ],
            });
          });
        }

        this.loading = false;
        // //console.log(res.data, "wwww");
      });
      getDeviceByPid(data, 1, this.pagetype, this.utils.userName).then(
        (res) => {
          //console.log(res.data, 3121);
          this.getDeviceByPidList = res.data;
        }
      );
    },
    // 查看echart图片函数
    async see(devId, productNumber) {
      this.one_echarts_loading = true;
      this.innerVisible = true;
      this.productNumber = productNumber;
      console.log(productNumber, "0----------");
      await getDeviceByDevId(devId).then(
        (res) => {
          if (res.data == null || res.data == undefined) {
            return this.$message.error("请稍后重试或联系管理员");
          }
          if (
            res.data.list[0].mess5[0] == null &&
            res.data.list[0].mess2 == "[]"
          ) {
            return this.$message.error("请稍后重试或联系管理员");
          }
          if (
            res.data.list[0].mess5 == "[]" &&
            res.data.list[0].mess2 == "[]"
          ) {
            return this.$message.error("请稍后重试或联系管理员");
          }
          // //console.log(res, "sssqqq");
          this.getDeviceByDevIdList = res.data.list[0];
          // this.getDeviceByDevIdList.mess5[0].push(
          //   this.getDeviceByDevIdList.mess2[0]
          // );
          //
          //console.log(Array.isArray(this.getDeviceByDevIdList.mess5));
          !Array.isArray(this.getDeviceByDevIdList.mess5)
            ? (this.mwss5Status = false)
            : (this.mwss5Status = true);
          //console.log(this.mwss5Status, 646654);
          if (this.mwss5Status == true) {
            //判断数组是非为空数组
            if (this.getDeviceByDevIdList.mess5.length <= 0) {
              return (this.mwss5Status = false);
            }
            this.getDeviceByDevIdList.mess5[0].date = this.getDeviceByDevIdList.mess2[0];
          }
        },
        () => {
          return this.$message.error("请稍后重试或联系管理员");
        }
      );
      // 设备详情接口
      ElecData(devId, now).then((res) => {
        //重置照片
        this.ElecDataList_images = [];
        this.ElecDataList = res.data;
        // console.log(res.data=='',9999);
        //判断接口里面是否有数据
        if (res.data != "") {
          if (res.data.DevData.length > 0) {
            if (res.data.DevData[0].image != "") {
              const list = res.data.DevData[0].image.split(",");
              list.forEach((Element) => {
                // Element =
                let a = "http://edog-online.com/ctx/devPic/" + Element;
                this.ElecDataList_images.push(a);
              });
            }
          }
          this.ElecDataList_typeName = res.data.DevData[0].typeName;
        }

        //console.log(this.ElecDataList_typeName);
        if (this.$route.path != "/FireInternetOfThings/PowerDetection") {
          ReadParameterApi(productNumber).then((res) => {
            // //console.log(res, "ldjakjdla");
            // this.getDeviceByDevIdList.row = res.data.row;
            // //console.log(this.getDeviceByDevIdList, 7899987978);
            console.log(res.data.row);
            if (res.data.row == undefined) {
              return this.$message.error("请稍后重试或联系管理员");
            }
            this.shengyu_loudian = {
              oneAlarm: this.getDeviceByDevIdList.mess2[0]
                .noLeakageAlarmACurrentValue,
              twoAlarm: this.getDeviceByDevIdList.mess2[0]
                .noLeakageAlarmBCurrentValue,
              threeAlarm: this.getDeviceByDevIdList.mess2[0]
                .noLeakageAlarmCCurrentValue,
              fourAlarm: this.getDeviceByDevIdList.mess2[0]
                .leakageAlarmCurrentValue,
              oneDianLiu: res.data.row.ADianLiu,
              twoDianLiu: res.data.row.BDianLiu,
              threeDianLiu: res.data.row.CDianLiu,
              fourDianLiu: res.data.row.SYdianliu,
              oneVolatage: this.getDeviceByDevIdList.mess2[0]
                .noVoltageAlarmAValue,
              twoVolatage: this.getDeviceByDevIdList.mess2[0]
                .noVoltageAlarmBValue,
              threeVolatage: this.getDeviceByDevIdList.mess2[0]
                .noVoltageAlarmCValue,
              oneDianYa: res.data.row.ADianYa,
              twoDianYa: res.data.row.BDianYa,
              threeDianYa: res.data.row.CDianYa,
              oneTempera: this.getDeviceByDevIdList.mess2[0]
                .noAlarmATemperatureValue,
              twoTempera: this.getDeviceByDevIdList.mess2[0]
                .noAlarmBTemperatureValue,
              threeTempera: this.getDeviceByDevIdList.mess2[0]
                .noAlarmCTemperatureValue,
              fourTempera: this.getDeviceByDevIdList.mess2[0]
                .noAlarmNTemperatureValue,
              oneWenDu: res.data.row.AWenDu,
              twoWenDu: res.data.row.BWenDu,
              threeWenDu: res.data.row.CWenDu,
              fourWenDu: res.data.row.NWenDu,
            };
            // //console.log(this.shengyu_loudian);
          });
        }
      });
      const time = new Date();
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      const now = year + "-" + month + "-" + day;

      if (this.$route.path == "/FireInternetOfThings/PowerDetection") {
        fracture(devId, this.utils.userName, "", "").then((res) => {
          this.one_echarts_loading = false;
          this.$nextTick(() => {
            let one_echart_left = this.$echarts.init(
              document.querySelector(".echarts_wapper_one_search")
            );

            let temp = [];
            let hum = [];
            let time = [];
            res.data.data.forEach((element) => {
              hum.push(element.hum);
              time.push(element.time);
              temp.push(element.temp);
            });

            one_echart_left.setOption({
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: ["湿度(%)"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: time,
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "湿度(%)",
                  type: "line",

                  data: hum,
                },
              ],
            });
            let two_echart_left = this.$echarts.init(
              document.querySelector(".echarts_wapper_two_search")
            );
            two_echart_left.setOption({
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: ["温度(%)"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: time,
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "温度(%)",
                  type: "line",

                  data: temp,
                },
              ],
            });
          });
        });
      } else {
        ElectricDeviceDate(devId, now).then((res) => {
          this.one_echarts_loading = false;
          let dianLiuUa = [];
          let dianLiuUb = [];
          let dianLiuUc = [];
          let dianLiuUd = [];
          let dianYaA = [];
          let dianYaB = [];
          let dianYaC = [];
          let wenduA = [];
          let wenduB = [];
          let wenduC = [];
          let wenduN = [];
          let name = [];

          //图标数据赋值
          res.data.Data.forEach((element) => {
            dianLiuUa.push(element.ia);
            dianLiuUb.push(element.ib);
            dianLiuUc.push(element.ic);
            dianLiuUd.push(element.ld);
            wenduA.push(element.ta);
            wenduB.push(element.tb);
            wenduC.push(element.tc);
            wenduN.push(element.tn);
            dianYaA.push(element.ua);
            dianYaB.push(element.ub);
            dianYaC.push(element.uc);
            name.push(element.happenedTime);
          });
          var one_echart_left;
          var two_echart_left;
          var three_echart_left;

          this.$nextTick(() => {
            one_echart_left = this.$echarts.init(
              document.querySelector(".echarts_wapper_one_search")
            );

            // 电流统计图
            one_echart_left.setOption({
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: ["A电流(mA)", "B电流(mA)", "C电流(mA)", "剩余电流(mA)"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: name.reverse(),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "A电流(mA)",
                  type: "line",

                  data: dianLiuUa.reverse(),
                },
                {
                  name: "B电流(mA)",
                  type: "line",

                  data: dianLiuUb.reverse(),
                },
                {
                  name: "C电流(mA)",
                  type: "line",

                  data: dianLiuUc.reverse(),
                },
                {
                  name: "剩余电流(mA)",
                  type: "line",

                  data: dianLiuUd.reverse(),
                },
              ],
            });

            // 第二个图表
            two_echart_left = this.$echarts.init(
              document.querySelector(".echarts_wapper_two_search")
            );

            two_echart_left.setOption({
              tooltip: {
                trigger: "axis",
              },
              legend: {
                data: ["A温度(℃)", "B温度(℃)", "C温度(℃)", "N温度(℃)"],
              },
              grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true,
              },
              toolbox: {
                feature: {
                  saveAsImage: {},
                },
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                data: name.reverse(),
              },
              yAxis: {
                type: "value",
              },
              series: [
                {
                  name: "A温度(℃)",
                  type: "line",

                  data: wenduA.reverse(),
                },
                {
                  name: "B温度(℃)",
                  type: "line",

                  data: wenduB.reverse(),
                },
                {
                  name: "C温度(℃)",
                  type: "line",

                  data: wenduC.reverse(),
                },
                {
                  name: "N温度(℃)",
                  type: "line",

                  data: wenduN.reverse(),
                },
              ],
            });
          });

          //第三个图表
          three_echart_left = this.$echarts.init(
            document.querySelector(".echarts_wapper_three_search")
          );
          three_echart_left.setOption({
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: ["A电压(V)", "B电压(V)", "C电压(V)"],
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true,
            },
            toolbox: {
              feature: {
                saveAsImage: {},
              },
            },
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: name.reverse(),
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                name: "A电压(V)",
                type: "line",
                // stack: "总量",
                data: dianYaA.reverse(),
              },
              {
                name: "B电压(V)",
                type: "line",
                // stack: "总量",
                data: dianYaB.reverse(),
              },
              {
                name: "C电压(V)",
                type: "line",
                // stack: "总量",
                data: dianYaC.reverse(),
              },
            ],
          });
        });
      }
    },

    //设备设置按钮
    shebeiBtn(num) {
      const role = sessionStorage.getItem("role");
      const power = sessionStorage.getItem("power");
      switch (num) {
        //远程断电
        case "1":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclose(this.ElecDataList.DevData[0].productNumber, 0).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;

        //远程开机
        case "2":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "shutdown"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.$message.error("暂无权限");
          }
        //远程关机
        case "3":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "startup"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //开启蜂鸣器
        case "4":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "voiceon"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //关闭蜂鸣器
        case "5":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "voiceoff"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.message.error("暂无权限");
          }
          break;
        //远程消音
        case "6":
          if (role == "1000" || power.indexOf("10003001") != -1) {
            resetclose(this.ElecDataList.DevData[0].productNumber, 2).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }

          break;
        //开启流量
        case "7":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDeviceOn(
              this.ElecDataList.DevData[0].productNumber,
              "openflow"
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
            break;
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //远程复位
        case "8":
          if (role == "1000" || power.indexOf("10003003") != -1) {
            resetclosefuwei(this.ElecDataList.DevData[0].productNumber, 2).then(
              (res) => {
                if (res.data.status == "1") {
                  this.$message.success(res.data.message);
                } else {
                  this.$message.error(res.data.message);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          } else {
            this.$message.error("暂无权限");
          }
          break;
        //授权
        case "9":
          if (role == "1000" || power.indexOf("10003004") != -1) {
            insertClouddog(this.ElecDataList.DevData[0].productNumber).then(
              (res) => {
                if (res.data.list[0].status == "true") {
                  this.$message.success(
                    "授权成功.工作日一天后将授权生效,非工作日将延期"
                  );
                } else {
                  this.$message.error("授权失败");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          break;
        //开启屏蔽器
        case "10":
          if (role == "1000" || power.indexOf("10003013") != -1) {
            updateShutdown(
              this.ElecDataList.DevData[0].productNumber,
              this.utils,
              userName
            ).then(
              (res) => {
                if (res.data.status == "true") {
                  layer.open({
                    content: res.mess,
                  });
                  this.$message.success(res.data.mess);
                } else {
                  this.$message.error(res.data.mess);
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          break;
        //下发保险单
        case "11":
          // //console.log(6554654);
          // //console.log(this.ElecDataList.DevData[0].productNumber, 789789);
          if (role == "1000" || power.indexOf("10003004") != -1) {
            putMessToDevice(
              this.ElecDataList.DevData[0].productNumber,
              this.baoxiandanhao
            ).then(
              (res) => {
                if (res.data.message == "请求成功") {
                  alert("下发保险单号成功");
                } else {
                  this.$message.error("请稍后重试");
                }
              },
              () => {
                this.$message.error("请稍后重试或联系管理员");
              }
            );
          }
          // var res = JSON.parse(result);
          // //console.log(res);

          break;
      }
    },
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    },
    onSubmit() {
      //console.log("submit!");
    },
    // TabS 切换函数
    // TabS 切换函数
    handleClick(tab, event) {
      // console.log(tab.label);
      if (tab.label === "阀值设置") {
        ReadParameterApi(this.ElecDataList.DevData[0].productNumber).then(
          (res) => {
            console.log(res.data.row);
            const row = res.data.row;
            this.fazhishezhi.AXWD = row.AWenDu;
            this.fazhishezhi.BXWD = row.BWenDu;
            this.fazhishezhi.CXWD = row.CWenDu;
            this.fazhishezhi.NXWD = row.NWenDu;
            this.fazhishezhi.SYDL = row.SYdianliu;
            this.fazhishezhi.AXDL = row.ADianLiu;
            this.fazhishezhi.BXDL = row.BDianLiu;
            this.fazhishezhi.CXDL = row.CDianLiu;
            this.fazhishezhi.AXDY = row.ADianYa;
            this.fazhishezhi.BXDY = row.BDianYa;
            this.fazhishezhi.CXDY = row.CDianYa;
          }
        );
      }
      if (tab.label === "设备历史故障") {
        getHistoryFault(
          this.ElecDataList.DevData[0].productNumber,
          this.DeviceHistory[0],
          this.DeviceHistory[1]
        ).then(
          (res) => {
            if (res.data.length <= 0) {
              return this.$message.error("暂无历史数据");
            }
            // this.DeviceHistory_LIST = res.data.DevData;
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
      if (tab.label === "设置操作记录") {
        // console.log(123);
        getUserInfo("", "", this.productNumber, "", "").then(
          (res) => {
            this.caozuojilv = res.data;
            if (res.data.length == 0) {
              return this.$message.error("暂无历史数据");
            }
          },
          () => {
            this.$message.error("请稍后重试或联系管理员");
          }
        );
      }
    },

    //火灾报警
    FireAlarmSystem(devID, productNumber) {
      this.FireAlarmSystem_loading = true;
      this.FireAlarmSystemDialog = true;
      let type;
      if (this.$route.path === "/FireInternetOfThings/FireAlarmSystem") {
        type = 4;
      } else {
        type = 7;
      }

      //console.log(this.$route.path, 666666);
      ElecData_type(devID, type).then((res) => {
        // res.data.DevInfo = [...res.data.DevInfo]
        // if(res.data)
        this.FireAlarmSystem_loading = false;
        console.log(res.data == "");
        if (res.data == "") {
          // this.this.ElecDataList_type_List_DevInfo = {};
          this.ElecDataList_type_List = [];
          return this.$message.error("请稍后重试或联系管理员");
        }
        this.ElecDataList_type_List = res.data;
        if (res.data.DevInfo != null || res.data.DevInfo != undefined) {
          this.ElecDataList_type_List_DevInfo.dSName = res.data.DevInfo.dSName;
          this.ElecDataList_type_List_DevInfo.dVName = res.data.DevInfo.dVName;
          this.ElecDataList_type_List_DevInfo.productNumber =
            res.data.DevInfo.productNumber;
          this.ElecDataList_type_List_DevInfo.installLocation =
            res.data.DevInfo.installLocation;
        }
      });
      getBluebirdevent(productNumber).then((res) => {
        // this.FireAlarmSystem_loading = false
        console.log(res.data);
        if (res.data.list == "[]") {
          return "";
        }
        this.getBluebirdevent_List = res.data.list;
      });
    },
  },
};
</script>

<style lang='less' scoped>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  // background-color: #f5f5f5;
}
#ezuikitTalkData {
  width: 95%;
  margin: 0 auto;
  // height: 600px;
}
.green {
  color: #6dff64;
}
.red {
  color: #f9387f;
}
/*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   background-color: rgb(13, 30, 77);
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 10px;
//   -webkit-box-shadow: inset 0 0 6px #1b6c89;
//   background-color: #1b6c89;
// }

.row-bg {
  padding: 5px 10px;

  // background-color: #f9fafc;
}
.titleWapper {
  /deep/.el-dialog__header {
    background: rgb(20, 49, 108);
    padding: 0;
    // /deep/.el-dialog__title {
    //   width: 255px;
    //   height: 30px;
    //   display: inline-block;
    //   background: linear-gradient(90deg, #3053af, #14295a);
    //   color: #fff;
    // }
    // /deep/.el-dialog__headerbtn .el-dialog__close {
    //   color: #fff;
    // }
  }
  /deep/.el-dialog__body {
    color: #fff;
    height: 100%;
    background: linear-gradient(0deg, rgb(39, 65, 132), rgb(2, 17, 50, 0.62));

    border: 1px solid #3486da;
    // border-radius: 6px;
  }
  .title_name {
    width: 255px;
    height: 30px;
    background: linear-gradient(90deg, #3053af, #14295a);
    line-height: 30px;
    padding-left: 16px;
    overflow: hidden;
  }
  .scroll_wapper {
    margin-top: 15px;
    // position: relative;
    overflow-y: auto;
    height: 370px; //高度根据需求自行设定
    overflow-x: hidden;
  }
  .scroll_wapper ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
  .left_one {
    margin-top: 15px;
    // width: 371px;
    // height: 131px;
    background: linear-gradient(-87deg, #3053af, #14295a);
    border: 1px solid #3486da;
    ul {
      margin: 15px 0 0 15px;
      li {
        margin-bottom: 10px;
      }
    }
    img {
      width: 84px;
      height: 84px;
      margin: 25px 0 0 15px;
    }
  }

  .right_wapper {
    margin-top: 30px;
    .one {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #f830af;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .one_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .one::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .two {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.2);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #30ff32;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }

    .two_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .two::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .three {
      cursor: pointer;
      position: relative;

      height: 75px;
      background: rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(54, 238, 248, 0.5);
      p {
        text-align: center;

        line-height: 50px;

        &:nth-child(2) {
          font-size: 20px;
          color: #c0cbe9;
        }
        &:nth-child(3) {
          // font-size: 20px;
          line-height: 0;
        }
      }
    }
    .equipmentColor {
      background: rgba(30, 85, 143);
    }
    .three_item::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;

      border-left: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three_item::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;

      border-right: 2px solid #00c0ff;
      border-bottom: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0;

      border-left: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;

      width: 10px;
      height: 10px;
    }
    .three::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      border-right: 2px solid #00c0ff;
      border-top: 2px solid #00c0ff;
      width: 10px;
      height: 10px;
    }
    .four {
      height: 274px;
      border: 1px solid #3486da;
      p {
        &:nth-child(1) {
          width: 180px;
          height: 30px;
          background: linear-gradient(90deg, #3053af, #14295a);
          line-height: 30px;
          padding-left: 16px;
          // margin-top: 14px;
          margin: 15px 0 0 15px;
        }
        &:nth-child(2) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(3) {
          padding: 0 16px;
          text-indent: 2em;
        }
        &:nth-child(4) {
          padding: 0 16px;
          text-indent: 2em;
        }
      }
    }
    .five {
      height: 274px;
      border: 1px solid #3486da;
      p {
        width: 180px;
        height: 30px;
        background: linear-gradient(90deg, #3053af, #14295a);
        line-height: 30px;
        padding-left: 16px;
        margin: 15px 0 0 15px;
      }
      ul {
        padding: 15px;
        font-size: 14px;
      }
      .echart_wapper {
        height: 230px;
      }
    }
  }
}
/deep/.el-textarea__inner {
  width: 90%;
  margin-left: 15px;
}
/deep/.el-dialog__header {
  background: #1071e2;

  /deep/.el-dialog__title {
    color: #fff;
  }
  /deep/.el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}

// /deep/.el-button--primary {
//   background: #1071e2;
// }
.chakan {
  cursor: pointer;
  color: #1071e2;
}
.shezhi_left {
  // background: #bfa;

  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  .titleP {
    margin-left: 20px;
    line-height: 40px;
    // text-align: center;
  }
  ul {
    border-top: 1px solid #f3f6fa;
    padding-left: 20px;
    li {
      margin-top: 8px;
    }
  }
}
.shizhi_right {
  .right_one {
    margin-left: 20px;
    height: 265px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    /deep/.el-button {
      width: 100%;
    }
  }
  .right_two {
    margin-top: 20px;
    margin-left: 20px;
    height: 580px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      border-bottom: 1px solid #f3f6fa;
      // text-align: center;
    }
    .tabs {
      padding: 10px 30px;
      p {
        margin-bottom: 5px;
        // margin-top: 20px;
      }
      .tabs_one {
        /deep/.el-input__inner {
          margin-bottom: 20px;
        }
      }

      /deep/.el-button {
        width: 100%;
      }
    }
  }
}
.shebeiWapper {
  margin-top: 25px;
  display: flex;
  // height: 1600px;
  .shebeiInfo {
    .one {
      width: 300px;
      color: #4b6082;

      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      span {
        color: #000;
      }
      .titleP {
        margin-left: 20px;
        line-height: 40px;
        // text-align: center;
      }
      ul {
        border-top: 1px solid #f3f6fa;
        padding-left: 20px;
        li {
          margin-top: 8px;
        }
      }
    }
    .two {
      margin-top: 20px;
      width: 300px;
      height: 250px;
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
      // background: #bfa;
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        // text-align: center;
        border-bottom: 1px solid #f3f6fa;
      }
      /deep/.el-button--mini {
        margin: 10px 0 0 15px;
      }
    }
    .ulInfo {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      text-align: center;
      margin: 0 auto;
      line-height: 150px;
      color: #fff;
      font-size: 20px;
    }
  }
  .shebeiEcharts {
    margin-left: 20px;
    width: 750px;
    // height: 212px;
    // background: #bfa;
    .imgWapper {
      height: 90px;
      text-align: center;
      background: #1071e2;
      div {
        // line-height: 90px;
        padding-top: 3px;
        p {
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      ul {
        margin-top: -10px;
        text-align: left;
        span {
          color: red;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .imgWapper_img {
        height: 90px;
        img {
          width: 35px;
          height: 35px;
        }
      }
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      height: 212px;
      ul {
        margin-left: 15px;
        li {
          margin-top: 15px;
        }
      }
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .two_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_two_search {
        width: 100%;
        height: 300px;
      }
    }
    .three_echarts {
      height: 340px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_three_search {
        width: 100%;
        height: 300px;
      }
    }
    .four_echarts {
      height: 200px;
      // background: #bfa;
      margin-top: 20px;
      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_four_search {
        width: 100%;
        height: 160px;
      }
    }
    .one_echarts {
      &:nth-child(1) {
        img {
          width: 44px;
          height: 48px;
        }
      }
      height: 340px;
      // background: #bfa;

      box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.1);
      .titleP {
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid #f3f6fa;
        // text-align: center;
      }
      .echarts_wapper_one_search {
        width: 100%;
        height: 300px;
      }
      ul {
        text-align: center;
        padding: 15px 0 0 20px;
        li {
          margin-bottom: 10px;
        }
      }
      img {
        width: 16px;
        height: 34px;
        margin-top: 10px;
      }
    }
  }
}
.rightWapper {
  margin-top: 50px;
  position: absolute;
  z-index: 999;
  right: 20px;
  width: 330px;
  .right_one {
    // background-image: ("../../../assets/images/zhengchangbili.png");
    height: 9 0px;
    background-size: 100% 100%;
    background-image: url("../../../assets/images/juxing5.png");
    .chaxun {
      padding-top: 20px;
      padding-left: 20px;
      /deep/.el-input__inner {
        background: #021019;
        color: #fff;
        border: 1px solid #3094d5;
      }
    }
    .scroll_wapper {
      // padding-left: px;
      // margin-top: 15px;
      // position: relative;

      overflow-y: auto;
      // height: 290px; //高度根据需求自行设定
      max-height: 350px;
      overflow-x: hidden;
      padding-bottom: -10px;
      .right_info {
        padding-left: 1px;
        // margin-top: 5px;
        margin-left: 3px;
        // padding: none;
        width: 99%;
        // height: 100px;
        border-top: 1px solid #3486da;
        box-sizing: border-box;
        .olList {
          padding-left: 18px;
          font-size: 14px;

          background: linear-gradient(-87deg, #3053af, #14295a);
          border-top: 1px solid #3486da;

          // height: 93px;
          &:nth-child(1) {
            border-top: none;
          }
          li {
            padding-bottom: 5px;
          }
        }
      }
    }
  }
}
.FireWaterSystemDialogWapper {
  width: 500px;
  margin: 0 auto;
  .title {
    text-align: center;
  }
  .shuiya_echarts {
    // width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  .yeya_echarts {
    width: 400px;
    height: 400px;
    margin: 0 auto;
    // background: #bfa;
  }
  /deep/.el-button--small {
    width: 120px;
  }
}
.shuju_echarts {
  width: 95%;
  height: 450px;
  margin: 0 auto;
  // background: #bfa;
  margin-top: 20px;

  box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
  p {
    line-height: 20px;
    padding: 10px 0 10px 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .shuju_echarts_wapper {
    // width: 90%;
    height: 410px;
    // margin: 0 auto;
    // background: #bfa;
    // margin-top: 30px;
  }
}

//火灾报警样式
.FireAlarmSystemDialog {
  // margin: 20px 0 0 20px;
  .one {
    width: 300px;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      margin-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
        span {
          display: inline-block;
          width: 70px;
          color: #4b6082;
        }
      }
    }
  }
  .two {
    margin-top: 20px;
    width: 100%;
    padding-bottom: 20px;
    // height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
  .formList {
    padding-left: 20px;
  }
  .three {
    margin-top: 20px;
    width: 100%;
    height: 200px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    p {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
  }
}
//独立烟感样式
.SmartIndependentSmoke {
  .two {
    // margin-top: 20px;
    // width: 300px;
    height: 250px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    /deep/.el-button--mini {
      margin: 10px 0 0 15px;
    }
  }
}
.SmartIndependentSmoke_right_wapper {
  .rihgt_one {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    ul {
      // border-top: 1px solid #f3f6fa;
      padding-left: 20px;
      li {
        margin-top: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          color: #4b6082;
          width: 70px;
          display: inline-block;
        }
      }
    }
  }
  .right_two {
    height: 160px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    // background: #bfa;
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    img {
      margin: 12px 70px;
      width: 50%;
      height: 100%;
    }
  }
  .SmartIndependentSmoke_echars_one {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .SmartIndependentSmoke_echars_one_wapper {
      height: 300px;
    }
  }
  .lishibaojing {
    margin-top: 20px;
    height: 340px;
    box-shadow: 0px 0px 10px 0px rgba(3, 27, 29, 0.11);
    .titleP {
      padding-left: 20px;
      line-height: 40px;
      // text-align: center;
      border-bottom: 1px solid #f3f6fa;
    }
    .formList {
      padding-left: 20px;
    }
  }
}
</style>