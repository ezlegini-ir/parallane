import AnimatedTitle from "@/components/animations/AnimatedTitle";
import {
  squarePatternSquare,
  studentProfile1,
  studentProfile2,
  studentProfile3,
  studentProfile6,
  studentProfile7,
  studentProfile9,
} from "@/public";
import Image from "next/image";
import CourseReviews from "./CourseReviews";

const ReviewsSection = () => {
  return (
    <div className="px-4 md:px-28 py-28 space-y-16 relative">
      <div className="pointer-events-none absolute -right-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-primary/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -right-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />
      <div className="pointer-events-none absolute -left-36 top-1/2 -translate-y-1/2 h-[420px] w-[420px] bg-primary/30 rounded-full blur-[120px]" />
      <Image
        alt=""
        src={squarePatternSquare}
        width={320}
        height={320}
        className="opacity-10 absolute -left-36 top-1/2 -translate-y-1/2  scale-125 pointer-events-none select-none"
      />

      <AnimatedTitle
        title="From Beginners to Senior Designers"
        highlight="Senior Designers"
        subtitle="Hear how students transformed their skills with parallane."
      />

      <div className="max-w-screen-xl mx-auto">
        <CourseReviews reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsSection;

const reviews = [
  {
    name: "James Anderson",
    picture: studentProfile6,
    rating: 5,
    review:
      "The support system is unlike anything I’ve seen in other courses. I sent multiple questions through the panel and always got real, detailed replies, not just one-liners. That gave me confidence to keep moving when I got stuck. It feels more like a mentorship than just a course.",
    date: "2023-10-09",
    workingNow: "UX/UI Designer at Google",
    startLearning: "2023-03-01",
    endLearning: "2023-08-01",
  },
  {
    name: "Mia Rodriguez",
    picture: studentProfile7,
    rating: 5,
    review:
      "Design systems scared me before, but now I build them from scratch. This section alone doubled my freelance rates. The course is practical, fun, and full of tips that you can immediately apply to real jobs.",
    date: "2025-04-18",
    workingNow: "Design Lead at Facebook",
    startLearning: "2024-01-01",
    endLearning: "2024-06-01",
  },
  {
    name: "Sophia Martinez",
    picture: studentProfile1,
    rating: 5,
    review:
      "I had tried YouTube tutorials before, but nothing clicked until this course. The Riala project gave me a real sense of how designers work in teams. It’s not just theory — it’s like being part of a product team for a few weeks. Now, when I look at job posts, I actually feel ready to apply.",
    date: "2023-02-14",
    workingNow: "Design Lead at Zenovia Solutions",
    startLearning: "2022-08-01",
    endLearning: "2022-12-15",
  },
  {
    name: "Liam Johnson",
    picture: studentProfile2,
    rating: 4,
    review:
      "Very solid structure. The basics were easy to follow and I loved the UI fundamentals section. Personally, I hoped for even more complex prototyping examples, but for someone entering the field, this is perfect. Would recommend without hesitation.",
    date: "2022-11-20",
    workingNow: "UX Designer at BlueWave Technologies",
    startLearning: "2022-05-01",
    endLearning: "2022-10-01",
  },
  {
    name: "Kiana Bazrafshan",
    picture: studentProfile3,
    rating: 5,
    review:
      "Hands down the best course I’ve ever purchased. Everything builds step by step, and the way the lessons flow is so natural. By the time I finished, I had a full portfolio project that I actually show to clients. If you want to break into UI, this is worth every dollar.",
    date: "2024-01-05",
    workingNow: "Product Designer at Snapp Group",
    startLearning: "2023-06-01",
    endLearning: "2023-11-01",
  },
  {
    name: "Benjamin Lee",
    picture: studentProfile9,
    rating: 5,
    review:
      "This is a long one, but I want to explain: I started the course just curious, with zero design background. By chapter 5 I was hooked. By chapter 9, I was redesigning my friend’s startup app. And now, just 6 months later, I’m working freelance with two paying clients. That’s wild. This course gave me a career shift I didn’t think was possible.",
    date: "2025-08-29",
    workingNow: "Freelancer",
    startLearning: "2024-02-01",
    endLearning: "2024-07-01",
  },
];
