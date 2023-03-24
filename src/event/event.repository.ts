import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventPosts } from "src/entities/events.entity";
import { Users } from "../entities/users.entity";
import { Repository } from "typeorm";
import { UpdateEventDto } from "src/event/dto/updateevent.dto";
import { DeleteEventDto } from "./dto/deleteevent.dto";

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(EventPosts)
    private readonly eventRepository: Repository<EventPosts>,
  ) {}

  async getEventById(eventPostId: number) {
    const nowPost = await this.eventRepository
      .createQueryBuilder("eventPost")
      .leftJoinAndSelect("eventPost.user", "nickName")
      .where("eventPost.id = :eventPostId", { eventPostId })
      .getOne();
  
    const prevPost = await this.eventRepository
    .createQueryBuilder("eventPost")
    .leftJoinAndSelect("eventPost.user", "nickName")
    .where("eventPost.id < :eventPostId", { eventPostId })
    .orderBy('eventPost.id','DESC')
    .getOne();
    const nextPost = await this.eventRepository
    .createQueryBuilder("eventPost")
    .leftJoinAndSelect("eventPost.user", "nickName")
    .where("eventPost.id > :eventPostId", { eventPostId })
    .orderBy('eventPost.id','ASC')
    .getOne()

    await this.eventRepository
    .createQueryBuilder()
    .update(EventPosts)
    .set({ viewCount: () => 'viewCount + 1' }) // 조회수를 1 증가
    .where('id = :id', { id: eventPostId })
    .execute(); // 쿼리 실행

    return {prevPost, nowPost, nextPost}
  }

  async createEvent(
    userId: number,
    title: string,
    content: string,
    startDate: Date,
    endDate: Date,
    postIMG: string,
  ) {
    await this.eventRepository.insert({
      userId,
      title,
      content,
      startDate,
      endDate,
      postIMG,
    });
  }

  async updateEvent(eventPostId: number, UpdateEventInfo) {
    const changedInfo = await this.eventRepository.update(eventPostId, {
      userId: UpdateEventInfo.userId,
      title: UpdateEventInfo.title,
      content: UpdateEventInfo.content,
      startDate: UpdateEventInfo.startDate,
      endDate: UpdateEventInfo.endDate,
      postIMG: UpdateEventInfo.postIMG,
    });
    return changedInfo;
  }

  async deleteEvent(eventPostId: number) {
    await this.eventRepository.softDelete(eventPostId);
    return true;
  }

  async paginatedResults(page, term?: string) {
    ///페이지네이션
    const take = 5;
    const selectedData = await this.eventRepository
      .createQueryBuilder("getEvents")
      .leftJoinAndSelect("getEvents.user", "user")
      .orderBy("getEvents.id", "DESC") //최신순(내림차순)
      .getMany();
    console.log(selectedData);

    const totalDataCount = selectedData.length; //불러온 데이터 목록 수
    const startIndex = (page - 1) * take;
    const endIndex = page * take;

    const slicedData = selectedData.slice(startIndex, endIndex); // 페이지당 조회할 데이터 묶음
    const lastPage = Math.ceil(totalDataCount / take); //생성될 페이지 수

    const unitSize = 3; // 페이지 묶음 단위 : 3개씩 < 1 2 3>  <4 5 6>
    const numOfUnits = Math.floor((page - 1) / unitSize); //<1 2 3> 페이지는 0 번째 index
    const unitStart = numOfUnits * unitSize + 1; //0번째 묶음의 시작은 1페이지, 1번째 묶음 시작은 4페이지...
    const unitEnd = unitStart + (unitSize - 1); //0번째 묶음의 끝은 3페이지, 1번째 묶음 끝은 6페이지
    const paginatedDemand = { page, slicedData, lastPage, unitStart, unitEnd };

    return {
      ...paginatedDemand,
    };
  }
}
