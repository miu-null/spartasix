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
  ) { }

  // 게시판 게시글 목록 조회
  async getEvents() {
    const data = await this.eventRepository.find({
      where: { deletedAt: null },
      relations : {user : true},
      select: ["id", "title", "createdAt", "userId", "startDate", "endDate", "viewCount"],
      order: {id: 'DESC'}})  //최신순(내림차순)})
    return data;
  }

  //게시글 상세 조회
  async getEventById(eventPostId: number) {
    const nowPost = await this.eventRepository   //현재글 상세 정보
      .createQueryBuilder("eventPost")
      .leftJoinAndSelect("eventPost.user", "nickName")
      .where("eventPost.id = :eventPostId", { eventPostId })
      .getOne();

    const prevPost = await this.eventRepository  //이전글 표기 정보
      .createQueryBuilder("eventPost")
      .leftJoinAndSelect("eventPost.user", "nickName")
      .where("eventPost.id < :eventPostId", { eventPostId })
      .orderBy('eventPost.id', 'DESC')

      .getOne();
    const nextPost = await this.eventRepository  //다음글 표기 정보
      .createQueryBuilder("eventPost") 
      .leftJoinAndSelect("eventPost.user", "nickName")
      .where("eventPost.id > :eventPostId", { eventPostId })
      .orderBy('eventPost.id', 'ASC')
      .getOne()

    await this.eventRepository // 조회수 1씩 증가
      .createQueryBuilder()
      .update(EventPosts)
      .set({ viewCount: () => 'viewCount + 1' }) 
      .where('id = :id', { id: eventPostId })
      .execute(); // 쿼리 실행

    const event = await this.eventRepository
    .createQueryBuilder("eventPost")
    .where("eventPost.id = :eventPostId", { eventPostId })
    .leftJoinAndSelect("eventPost.user", "nickName")
    .getOne();

    return {prevPost, nowPost, nextPost, event}
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

  async updateEvent(id: number, UpdateEventInfo) {
    const changedInfo = await this.eventRepository.update(id, {
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
}
