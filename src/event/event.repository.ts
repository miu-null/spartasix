import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventPosts } from "src/entities/eventposts.entity";
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

  // async getEvents() {// 아래 페이지네이션 함수 참고
  //   const events = await this.eventRepository
  //     .createQueryBuilder("eventUser")
  //     .leftJoinAndSelect("eventUser.user", "nickName")
  //     .getMany();
  //   return events;
  // } // mySQL leftjoin

  async getEventById(eventPostId) {
    const event = await this.eventRepository
      .createQueryBuilder("eventUser")
      .where("eventPostId = :eventPostId", { eventPostId })
      .leftJoinAndSelect("eventUser.user", "nickName")
      .getOne();
    return event;
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
    const take = 4;
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
