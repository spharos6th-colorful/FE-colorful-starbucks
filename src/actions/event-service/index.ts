'use server';

export type EventResponseType = {
  title: string;
  eventUuid: string;
  thumbnailUrl: string;
};

export type DetailEventResponseType = {
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  startDate: Date;
  endDate: Date;
  policy: string;
  status: string;
};
const BASE_URL = 'http://13.209.230.182:8080/api/v1';

export const getEvents = async (
  page: number,
  size: number,
): Promise<EventResponseType[]> => {
  try {
    const response = await fetch(
      BASE_URL + `/events?size=${size}&page=${page}`,
    );

    const result = await response.json();
    return result.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getEventsDummy = async (): Promise<EventResponseType[]> => {
  const dummyEvents: EventResponseType[] = [
    {
      title: '버디위크 with 랜쇼페',
      eventUuid: 'e1b2c3d4',
      thumbnailUrl: 'https://example.com/images/music-festival.jpg',
    },
    {
      title: '골드회원 클라이언스',
      eventUuid: 'a7b8c9d0',
      thumbnailUrl: 'https://example.com/images/tech-conf.jpg',
    },
    {
      title: 'Ways of Workding',
      eventUuid: 'f1e2d3c4',
      thumbnailUrl: 'https://example.com/images/food-expo.jpg',
    },
    {
      title: '각인 큐레이션',
      eventUuid: 'b5a6c7d8',
      thumbnailUrl: 'https://example.com/images/film-festival.jpg',
    },
    {
      title: '조선 커피를 만나다',
      eventUuid: 'c1d2e3f4',
      thumbnailUrl: 'https://example.com/images/sports-finals.jpg',
    },
    {
      title: '맛나는 커피당',
      eventUuid: 'd5e6f7g8',
      thumbnailUrl: 'https://example.com/images/art-exhibition.jpg',
    },
  ];

  return dummyEvents;
};

export const getDetailEvent = async (
  eventUuid: string,
): Promise<DetailEventResponseType> => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/v1/events/${eventUuid}`,
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDetailEventDummy = async (
  eventUuid: string,
): Promise<DetailEventResponseType> => {
  const result: DetailEventResponseType = {
    title: '이벤트라능',
    description: '이 이벤트는 아주 좋지',
    imageUrl: `/images/eventDetailImages/event_detail.webp`,
    thumbnailUrl: eventUuid,
    startDate: new Date(),
    endDate: new Date(),
    policy: 'string',
    status: 'string',
  };
  return result;
};
