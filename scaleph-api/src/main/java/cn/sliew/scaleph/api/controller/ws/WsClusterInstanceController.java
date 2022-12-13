/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package cn.sliew.scaleph.api.controller.ws;

import cn.sliew.scaleph.api.annotation.Logging;
import cn.sliew.scaleph.engine.flink.service.WsFlinkClusterInstanceService;
import cn.sliew.scaleph.engine.flink.service.WsFlinkService;
import cn.sliew.scaleph.engine.flink.service.dto.WsFlinkClusterInstanceDTO;
import cn.sliew.scaleph.engine.flink.service.param.WsFlinkClusterInstanceParam;
import cn.sliew.scaleph.system.vo.ResponseVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@Api(tags = "Flink管理-集群实例管理")
@RestController
@RequestMapping(path = "/api/flink/cluster-instance")
public class WsClusterInstanceController {

    @Autowired
    private WsFlinkClusterInstanceService wsFlinkClusterInstanceService;
    @Autowired
    private WsFlinkService wsFlinkService;

    @Logging
    @GetMapping
    @ApiOperation(value = "查询集群实例列表", notes = "分页查询集群实例列表")
    public ResponseEntity<Page<WsFlinkClusterInstanceDTO>> list(@Valid WsFlinkClusterInstanceParam param) {
        Page<WsFlinkClusterInstanceDTO> page = wsFlinkClusterInstanceService.list(param);
        return new ResponseEntity<>(page, HttpStatus.OK);
    }

    @Logging
    @GetMapping({"{id}"})
    @ApiOperation(value = "查询集群实例", notes = "查询集群实例")
    public ResponseEntity<WsFlinkClusterInstanceDTO> selectOne(@PathVariable("id") Long id) {
        final WsFlinkClusterInstanceDTO result = wsFlinkClusterInstanceService.selectOne(id);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @Logging
    @PutMapping
    @ApiOperation(value = "创建 session 集群", notes = "创建 session 集群")
    public ResponseEntity<ResponseVO> createSessionCluster(@Valid @RequestBody WsFlinkClusterInstanceDTO param) throws Exception {
        wsFlinkService.createSessionCluster(param.getProjectId(), param.getFlinkClusterConfigId());
        return new ResponseEntity<>(ResponseVO.sucess(), HttpStatus.OK);
    }

    @Logging
    @DeleteMapping("{id}")
    @ApiOperation(value = "关闭集群", notes = "关闭集群")
    public ResponseEntity<ResponseVO> shutdownCluster(@PathVariable("id") Long id) throws Exception {
        wsFlinkService.shutdown(id);
        return new ResponseEntity<>(ResponseVO.sucess(), HttpStatus.OK);
    }

    @Logging
    @DeleteMapping(path = "/batch")
    @ApiOperation(value = "批量关闭集群", notes = "批量关闭集群")
    public ResponseEntity<ResponseVO> shutdownClusterBatch(@RequestBody List<Long> ids) throws Exception {
        wsFlinkService.shutdownBatch(ids);
        return new ResponseEntity<>(ResponseVO.sucess(), HttpStatus.OK);
    }

}