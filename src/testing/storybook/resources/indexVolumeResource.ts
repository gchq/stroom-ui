import { HttpRequest, HttpResponse } from "@pollyjs/adapter-fetch";

import { TestCache } from "../PollyDecorator";
import { Config } from "src/startup/config";
import { ResourceBuilder } from "./types";
import { IndexVolume } from "src/components/IndexVolumes/api";
import { IndexVolumeGroup } from "src/components/IndexVolumeGroups/api";

let nextIdToCreate = 100000;

const resourceBuilder: ResourceBuilder = (
  server: any,
  { stroomBaseServiceUrl }: Config,
  testCache: TestCache,
) => {
  const resource = `${stroomBaseServiceUrl}/stroom-index/volume/v1`;

  // Get All
  server.get(resource).intercept((req: HttpRequest, res: HttpResponse) => {
    res.json(testCache.data!.indexVolumesAndGroups.volumes);
  });

  // Get By ID
  server
    .get(`${resource}/:indexVolumeId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let indexVolumeId: string = req.params.indexVolumeId;
      let indexVolume = testCache.data!.indexVolumesAndGroups.volumes.find(
        v => `${v.id}` === indexVolumeId,
      );
      if (!!indexVolume) {
        res.json(indexVolume);
      } else {
        res.sendStatus(404);
      }
    });

  // Create
  server.post(resource).intercept((req: HttpRequest, res: HttpResponse) => {
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
      statusMs: now,
    };

    testCache.data!.indexVolumesAndGroups = {
      ...testCache.data!.indexVolumesAndGroups,
      volumes: testCache.data!.indexVolumesAndGroups.volumes.concat([
        newIndexVolume,
      ]),
    };

    res.json(newIndexVolume);
  });

  // Delete
  server
    .delete(`${resource}/:indexVolumeId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let oldIndexVolumeId = req.params.indexVolumeId;
      testCache.data!.indexVolumesAndGroups = {
        ...testCache.data!.indexVolumesAndGroups,
        volumes: testCache.data!.indexVolumesAndGroups.volumes.filter(
          v => v.id !== oldIndexVolumeId,
        ),
      };

      res.send(undefined);
      // res.sendStatus(204);
    });

  // Get Volumes in Group
  server
    .get(`${resource}/inGroup/:groupName`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let groupName = req.params.groupName;

      let indexVolumeIds: IndexVolume[] = testCache
        .data!.indexVolumesAndGroups.groupMemberships.filter(
          m => m.groupName === groupName,
        )
        .map(m => m.volumeId)
        .map(vId =>
          testCache.data!.indexVolumesAndGroups.volumes.find(v => v.id === vId),
        )
        .map(v => v!);

      res.send(indexVolumeIds);
    });

  // Get Groups for Volume
  server
    .get(`${resource}/groupsFor/:indexVolumeId`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let indexVolumeId = req.params.indexVolumeId;

      let groups: IndexVolumeGroup[] = testCache
        .data!.indexVolumesAndGroups.groupMemberships.filter(
          m => m.volumeId === indexVolumeId,
        )
        .map(m => m.groupName)
        .map(groupName =>
          testCache.data!.indexVolumesAndGroups.groups.find(
            g => g.name === groupName,
          ),
        )
        .filter(g => g !== undefined)
        .map(g => g!);

      res.send(groups);
    });

  // Add Volume to Group
  server
    .post(`${resource}/inGroup/:volumeId/:groupName`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      testCache.data!.indexVolumesAndGroups.groupMemberships = testCache.data!.indexVolumesAndGroups.groupMemberships.concat(
        [
          {
            groupName: req.params.groupName,
            volumeId: req.params.volumeId,
          },
        ],
      );

      res.send(undefined);
      // res.sendStatus(204);
    });

  // Remove Volume from Group
  server
    .delete(`${resource}/inGroup/:volumeId/:groupName`)
    .intercept((req: HttpRequest, res: HttpResponse) => {
      let groupName: string = req.params.groupName;
      let volumeId: string = req.params.volumeId;
      testCache.data!.indexVolumesAndGroups.groupMemberships = testCache.data!.indexVolumesAndGroups.groupMemberships.filter(
        m => !(m.groupName === groupName && m.volumeId === volumeId),
      );

      res.send(undefined);
      // res.sendStatus(204);
    });
};

export default resourceBuilder;
