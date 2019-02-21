import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "../../../startup/config";
import { ResourceBuilder } from "./resourceBuilder";
import { IndexVolume } from "../../../types";

let nextIdToCreate = 100000;

const resourceBuilder: ResourceBuilder = (
  server: any,
  testConfig: Config,
  testCache: TestCache
) => {
  // Get All
  server
    .get(`${testConfig.stroomBaseServiceUrl}/stroom-index/volume/v1`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      res.json(testCache.data!.indexVolumesAndGroups.volumes);
    });

  // Get By ID
  server
    .get(
      `${testConfig.stroomBaseServiceUrl}/stroom-index/volume/v1/:indexVolumeId`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let indexVolumeId: string = req.params.indexVolumeId;
      let indexVolume = testCache.data!.indexVolumesAndGroups.volumes.find(
        v => `${v.id}` === indexVolumeId
      );
      if (!!indexVolume) {
        res.json(indexVolume);
      } else {
        res.sendStatus(404);
      }
    });

  // Create
  server
    .post(`${testConfig.stroomBaseServiceUrl}/stroom-index/volume/v1`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      const { nodeName, path } = JSON.parse(req.body);
      let now = Date.now();
      let newIndexVolume: IndexVolume = {
        nodeName,
        path,
        id: `${nextIdToCreate++}`,
        createTimeMs: now,
        updateTimeMs: now,
        createUser: "test",
        updateUser: "test",
        bytesFree: 100,
        bytesLimit: 100,
        bytesUsed: 100,
        bytesTotal: 100,
        statusMs: now
      };

      testCache.data!.indexVolumesAndGroups = {
        ...testCache.data!.indexVolumesAndGroups,
        volumes: testCache.data!.indexVolumesAndGroups.volumes.concat([
          newIndexVolume
        ])
      };

      res.json(newIndexVolume);
    });

  // Delete
  server
    .delete(
      `${testConfig.stroomBaseServiceUrl}/stroom-index/volume/v1/:indexVolumeId`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let oldIndexVolumeId = req.params.indexVolumeId;
      testCache.data!.indexVolumesAndGroups = {
        ...testCache.data!.indexVolumesAndGroups,
        volumes: testCache.data!.indexVolumesAndGroups.volumes.filter(
          v => v.id !== oldIndexVolumeId
        )
      };

      res.send(undefined);
      // res.sendStatus(204);
    });

  // Get Volumes in Group
  server
    .get(
      `${
        testConfig.stroomBaseServiceUrl
      }/stroom-index/volume/v1/inGroup/:groupName`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let groupName = req.params.groupName;

      let indexVolumeIds: Array<IndexVolume> = testCache
        .data!.indexVolumesAndGroups.groupMemberships.filter(
          m => m.groupName === groupName
        )
        .map(m => m.volumeId)
        .map(vId =>
          testCache.data!.indexVolumesAndGroups.volumes.find(v => v.id === vId)
        )
        .map(v => v!);

      res.send(indexVolumeIds);
    });

  // Get Groups for Volume
  server
    .get(
      `${
        testConfig.stroomBaseServiceUrl
      }/stroom-index/volume/v1/groupsFor/:indexVolumeId`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let indexVolumeId = req.params.indexVolumeId;

      let groupNames: Array<
        string
      > = testCache
        .data!.indexVolumesAndGroups.groupMemberships.filter(
          m => m.volumeId === indexVolumeId
        )
        .map(m => m.groupName);

      res.send(groupNames);
    });

  // Add Volume to Group
  server
    .post(
      `${
        testConfig.stroomBaseServiceUrl
      }/stroom-index/volume/v1/inGroup/:volumeId/:groupName`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      testCache.data!.indexVolumesAndGroups.groupMemberships = testCache.data!.indexVolumesAndGroups.groupMemberships.concat(
        [
          {
            groupName: req.params.groupName,
            volumeId: req.params.volumeId
          }
        ]
      );

      res.send(undefined);
      // res.sendStatus(204);
    });

  // Remove Volume from Group
  server
    .delete(
      `${
        testConfig.stroomBaseServiceUrl
      }/stroom-index/volume/v1/inGroup/:volumeId/:groupName`
    )
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let groupName: string = req.params.groupName;
      let volumeId: string = req.params.volumeId;
      testCache.data!.indexVolumesAndGroups.groupMemberships = testCache.data!.indexVolumesAndGroups.groupMemberships.filter(
        m => !(m.groupName === groupName && m.volumeId === volumeId)
      );

      res.send(undefined);
      // res.sendStatus(204);
    });
};

export default resourceBuilder;
