export interface Badge {
  badge: string;
  title: string;
  description: string;
  image: string;
}

export const badgeList: Badge[] = [
  {
    badge: '배지1',
    title: '술고래',
    description: '숙취해소제 10원 페이백',
    image: '/assets/images/badges/1.png',
  },
  {
    badge: '배지2',
    title: '호박?수박?',
    description: '올리브영 100원 페이백',
    image: '/assets/images/badges/2.png',
  },
  {
    badge: '배지3',
    title: '코끼리',
    description: '샐러드 주문 시 100원 페이백',
    image: '/assets/images/badges/3.png',
  },
  {
    badge: '배지4',
    title: '집좀가',
    description: '야놀자 100원 페이백',
    image: '/assets/images/badges/4.png',
  },
];