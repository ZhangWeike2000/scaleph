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

package cn.sliew.scaleph.kubernetes.oam;

import io.fabric8.kubernetes.model.annotation.Group;
import io.fabric8.kubernetes.model.annotation.Version;
import lombok.Data;

@Data
@Group("core.oam.dev")
@Version("v1beta1")
public class ComponentDefinition extends AbstractSchema {

    private Spec spec;

    @Data
    public static class Spec {

        private Semantic semantic;
        private WorkloadTypeDescriptor workload;
    }

    @Data
    public static class Semantic {
        // kubevela 支持 cue、helm、kube
    }

    @Data
    public static class WorkloadTypeDescriptor {

        /**
         * 通过 name 引用 WorkloadDefinition
         */
        private String type;

        /**
         * 通过 group、version 和 kind 引用 WorkloadDefinition。gvk -> group、version、kind
         * 和 type 互斥，只能同时存在一个。
         */
        private WorkloadGVK definition;
    }

    @Data
    public static class WorkloadGVK {

        private String apiVersion;
        private String kind;
    }
}