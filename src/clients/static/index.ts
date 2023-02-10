import * as partnersRaw from './json/partner.json';
import * as programPartsRaw from './json/programpart.json';
import * as activitiesRaw from './json/activity.json';
import * as speakersRaw from './json/speaker.json';
import {
  Partner, ProgramPart, Speaker, ActivityResponse,
} from '../server.generated';

// eslint-disable-next-line import/export
export * from '../server.generated';

// eslint-disable-next-line import/export
export class ClientStatic {
  public getAllPartners(): Promise<Partner[]> {
    const res = Array.from(partnersRaw) as any as Partner[];
    return Promise.resolve(res);
  }

  public getAllProgramParts(): Promise<ProgramPart[]> {
    const res = Array.from(programPartsRaw) as any as ProgramPart[];
    return Promise.resolve(res);
  }

  public getAllActivities(): Promise<ActivityResponse[]> {
    const res = Array.from(activitiesRaw) as any as ActivityResponse[];
    return Promise.resolve(res);
  }

  // eslint-disable-next-line no-unused-vars
  public getAllSpeakers(activities: boolean): Promise<Speaker[]> {
    const res = Array.from(speakersRaw) as any as Speaker[];
    return Promise.resolve(res);
  }
}
